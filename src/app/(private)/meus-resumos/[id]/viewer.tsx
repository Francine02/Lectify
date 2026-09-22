'use client';

import { ConfirmDialog } from '@/components/ConfirmDialog';
import { SourceBadge } from '@/components/Library/SourceBadge';
import { Loading } from '@/components/Loading';
import { SummaryPanel } from '@/components/Study/SummaryPanel';
import { CACHE_KEYS } from '@/constants/cache/cache-keys';
import { deleteSummaryFile } from '@/service/summary/delete-summary-file';
import { downloadSummaryFile } from '@/service/summary/download-summary-file';
import { getSummaryFiles } from '@/service/summary/get-summary-files';
import { SummaryFile } from '@/types/SummaryFile';
import { readBlob, writeBlob, dropBlob } from '@/utils/cache/blob-cache';
import { readCache, writeCache } from '@/utils/cache/client-cache';
import { cn } from '@/utils/cn';
import { formatSummaryDate } from '@/utils/formatters/format-summary-date';
import { summaryExpiration } from '@/utils/summary/expiration';
import { useNotes } from '@/hooks/useNotes';
import { ArrowLeft, Clock3, Download, ListChecks, NotebookPen, Trash2, Youtube } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const formatStyles: Record<string, string> = {
  pdf: 'bg-coral-50 text-coral-700',
  md: 'bg-sky-50 text-sky-700',
};

const expirationStyles = {
  expired: 'bg-coral-50 text-coral-700',
  soon: 'bg-sun-50 text-sun-700',
  ok: 'bg-canvas text-subtle',
};

/** Leitura do resumo dentro do app, sem precisar baixar nem gerar questões. */
export function SummaryViewer() {
  const params = useParams();
  const router = useRouter();
  const { createNote, noteForSummary } = useNotes();

  const id = String(params.id);

  const [file, setFile] = useState<SummaryFile | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const objectUrlRef = useRef('');

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const show = useCallback((content: Blob) => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

    const next = URL.createObjectURL(content);
    objectUrlRef.current = next;

    setBlob(content);
    setUrl(next);
    setStatus('ready');
  }, []);

  useEffect(() => {
    let active = true;

    const load = async () => {
      // os metadados normalmente já vieram com a listagem
      const cached = readCache<SummaryFile[]>(CACHE_KEYS.summaryFiles)?.data;
      const known = cached?.find((item) => item.id === id);

      if (known) setFile(known);

      const content = readBlob(id);

      if (content) {
        show(content);
      } else {
        const response = await downloadSummaryFile(id);

        if (!active) return;

        if (!response.success || !response.data) {
          setStatus('error');
          return;
        }

        writeBlob(id, response.data);
        show(response.data);
      }

      if (known || !active) return;

      // entrou direto pela URL: busca os metadados para o cabeçalho
      const list = await getSummaryFiles();

      if (!active || !list.success || !Array.isArray(list.data)) return;

      writeCache(CACHE_KEYS.summaryFiles, list.data);
      setFile(list.data.find((item) => item.id === id) ?? null);
    };

    load();

    return () => {
      active = false;
    };
  }, [id, show]);

  /** Uma folha por resumo: se já existe anotação desse material, volta para ela. */
  const openNotes = () => {
    const existing = noteForSummary(id);

    if (existing) {
      router.push(`/caderno/${existing.id}`);
      return;
    }

    const note = createNote({
      title: filename.replace(/\.(pdf|md)$/i, ''),
      summary: {
        id,
        filename,
        filetype: file?.filetype ?? 'md',
        youtubeUrl: file?.youtube_url,
      },
    });

    router.push(`/caderno/${note.id}`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    const response = await deleteSummaryFile(id);

    setIsDeleting(false);
    setIsConfirmOpen(false);

    if (!response.success) {
      toast.error(response.error?.message ?? 'Não foi possível excluir esse resumo.');
      return;
    }

    const removed = response.data?.removed_questions ?? 0;

    toast.success(
      removed > 0
        ? `Resumo excluído junto com ${removed} ${removed === 1 ? 'questão' : 'questões'}.`
        : 'Resumo excluído.'
    );

    dropBlob(id);

    const cached = readCache<SummaryFile[]>(CACHE_KEYS.summaryFiles)?.data ?? [];
    writeCache(
      CACHE_KEYS.summaryFiles,
      cached.filter((item) => item.id !== id)
    );

    router.push('/meus-resumos');
  };

  if (status === 'error')
    return (
      <div className="card flex flex-col items-center gap-4 py-16 text-center">
        <p className="subtitle max-w-sm">
          Não conseguimos abrir esse resumo. Ele pode ter expirado — a validade é de 7 dias.
        </p>
        <Link
          href="/meus-resumos"
          className="focus-ring rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          Voltar para a biblioteca
        </Link>
      </div>
    );

  const expiration = summaryExpiration(file?.expires_at);
  const filename = file?.filename ?? 'Resumo';

  return (
    <section className="space-y-4">
      <Link
        href="/meus-resumos"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle transition-colors hover:text-purple-700"
      >
        <ArrowLeft size={13} />
        Meus resumos
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <h1 className="break-words text-title font-extrabold">{filename}</h1>

          <div className="flex flex-wrap items-center gap-2">
            {file && (
              <>
                <span className={cn('chip uppercase', formatStyles[file.filetype])}>
                  {file.filetype}
                </span>

                <span className={cn('chip', expirationStyles[expiration.state])}>
                  <Clock3 size={11} />
                  {expiration.label}
                </span>

                <SourceBadge source={file.source} />

                <span className="text-xs text-faint">
                  Gerado em {formatSummaryDate(file.summary_at)}
                </span>
              </>
            )}
          </div>

          {file?.youtube_url && (
            <a
              href={file.youtube_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 truncate text-xs text-subtle transition-colors hover:text-purple-700"
            >
              <Youtube className="shrink-0 text-coral-500" size={13} />
              <span className="truncate">{file.youtube_url}</span>
            </a>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {url && (
            <a
              href={url}
              download={filename}
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-canvas"
            >
              <Download size={14} />
              Baixar
            </a>
          )}

          <button
            type="button"
            onClick={openNotes}
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-canvas"
          >
            <NotebookPen size={14} />
            Anotar
          </button>

          <Link
            href={`/gerar-quiz?resumo=${id}&nome=${encodeURIComponent(filename)}&formato=${file?.filetype ?? 'md'}`}
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <ListChecks size={14} />
            Gerar questões
          </Link>

          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            aria-label="Excluir resumo"
            className="focus-ring rounded-xl border border-line bg-surface p-2.5 text-subtle transition-colors hover:border-coral-500/40 hover:bg-coral-50 hover:text-coral-700"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </header>

      {status === 'loading' || !blob ? (
        <div className="card flex min-h-[55vh] flex-col items-center justify-center gap-3">
          <Loading />
          <p className="text-xs text-subtle">Abrindo seu resumo...</p>
        </div>
      ) : (
        <SummaryPanel url={url} blob={blob} format={file?.filetype ?? 'md'} />
      )}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        isLoading={isDeleting}
        title="Excluir este resumo?"
        confirmLabel="Excluir tudo"
        description={
          <>
            <strong className="text-ink">{filename}</strong> será apagado da sua biblioteca. As
            questões geradas a partir dele <strong className="text-ink">também são apagadas</strong>{' '}
            e essa ação não pode ser desfeita.
          </>
        }
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </section>
  );
}
