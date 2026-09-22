'use client';

import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Loading } from '@/components/Loading';
import { SourceBadge } from '@/components/Library/SourceBadge';
import { deleteSummaryFile } from '@/service/summary/delete-summary-file';
import { downloadSummaryFile } from '@/service/summary/download-summary-file';
import { SummaryFile } from '@/types/SummaryFile';
import { cn } from '@/utils/cn';
import { formatSummaryDate } from '@/utils/formatters/format-summary-date';
import { getYoutubeId } from '@/utils/formatters/get-youtube-id';
import { readBlob, writeBlob } from '@/utils/cache/blob-cache';
import { summaryExpiration } from '@/utils/summary/expiration';
import { BookOpen, Clock3, Download, ListChecks, Trash2, Youtube } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
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

type SummaryCardProps = {
  file: SummaryFile;
  onDeleted: (id: string) => void;
};

export function SummaryCard({ file, onDeleted }: SummaryCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const expiration = summaryExpiration(file.expires_at);
  const videoId = getYoutubeId(file.youtube_url);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // se o resumo já foi aberto nesta aba, o arquivo está em memória
      let content = readBlob(file.id);

      if (!content) {
        const response = await downloadSummaryFile(file.id);

        if (!response.success || !response.data) {
          toast.error(response.error?.message ?? 'Não foi possível baixar esse resumo.');
          return;
        }

        content = response.data;
        writeBlob(file.id, content);
      }

      const url = URL.createObjectURL(content);
      const link = document.createElement('a');

      link.href = url;
      link.download = file.filename;
      link.click();

      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    const response = await deleteSummaryFile(file.id);

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

    onDeleted(file.id);
  };

  const readHref = `/meus-resumos/${file.id}`;
  const quizHref = `/gerar-quiz?resumo=${file.id}&nome=${encodeURIComponent(file.filename)}&formato=${file.filetype}`;

  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <Link
        href={readHref}
        aria-label={`Abrir ${file.filename}`}
        className="relative block aspect-[16/7] w-full overflow-hidden bg-purple-900"
      >
        {videoId ? (
          <img
            src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
            alt=""
            loading="lazy"
            className="size-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-white/40">
            <Youtube size={28} />
          </div>
        )}

        <span className="absolute inset-0 flex items-center justify-center bg-purple-900/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-purple-800">
            <BookOpen size={13} />
            Ler resumo
          </span>
        </span>

        <span
          className={cn(
            'chip absolute left-3 top-3 uppercase shadow-soft',
            formatStyles[file.filetype] ?? 'bg-canvas text-subtle'
          )}
        >
          {file.filetype}
        </span>

        <span
          className={cn('chip absolute right-3 top-3 shadow-soft', expirationStyles[expiration.state])}
        >
          <Clock3 size={11} />
          {expiration.label}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <h2 className="line-clamp-2 text-sm font-bold leading-snug" title={file.filename}>
            <Link href={readHref} className="transition-colors hover:text-purple-700">
              {file.filename}
            </Link>
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs text-faint">Gerado em {formatSummaryDate(file.summary_at)}</p>
            <SourceBadge source={file.source} />
          </div>
        </div>

        {file.youtube_url && (
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

        <div className="mt-auto flex items-center gap-2 pt-1">
          <Link
            href={readHref}
            className="focus-ring inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <BookOpen size={13} />
            Ler
          </Link>

          <Link
            href={quizHref}
            className="focus-ring inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-semibold text-purple-700 transition-colors hover:bg-purple-50"
          >
            <ListChecks size={13} />
            Questões
          </Link>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            aria-label="Baixar resumo"
            className="focus-ring inline-flex cursor-pointer items-center justify-center rounded-xl border border-line px-3 py-2 text-subtle transition-colors hover:bg-canvas hover:text-ink disabled:opacity-60"
          >
            {isDownloading ? <Loading className="size-4" /> : <Download size={14} />}
          </button>

          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            aria-label="Excluir resumo"
            className="focus-ring inline-flex cursor-pointer items-center justify-center rounded-xl border border-line px-3 py-2 text-subtle transition-colors hover:border-coral-500/40 hover:bg-coral-50 hover:text-coral-700"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        isLoading={isDeleting}
        title="Excluir este resumo?"
        confirmLabel="Excluir tudo"
        description={
          <>
            <strong className="text-ink">{file.filename}</strong> será apagado da sua biblioteca.
            As questões geradas a partir dele <strong className="text-ink">também são apagadas</strong> e
            essa ação não pode ser desfeita.
          </>
        }
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </article>
  );
}
