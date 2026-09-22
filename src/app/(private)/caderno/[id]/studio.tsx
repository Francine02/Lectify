'use client';

import { Loading } from '@/components/Loading';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import { SummaryPicker } from '@/components/Notebook/SummaryPicker';
import { useNotes } from '@/hooks/useNotes';
import { downloadSummaryFile } from '@/service/summary/download-summary-file';
import { Note, NoteSummaryRef } from '@/types/Note';
import { readBlob, writeBlob } from '@/utils/cache/blob-cache';
import { cn } from '@/utils/cn';
import {
  downloadNoteDocument,
  markdownToPrintHtml,
  printNoteDocument,
} from '@/utils/notebook/export-note';
import {
  ArrowLeft,
  BookOpen,
  Download,
  FileText,
  Link2,
  Printer,
  Unlink,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

/**
 * Folha de estudo: o resumo de um lado, as anotações do outro, e no fim um
 * documento único com os dois — que é o ponto de ter o caderno aqui dentro.
 */
export function NoteStudio() {
  const params = useParams();
  const noteId = String(params.id);

  const { notes, isReady, updateNote, attachSummary, detachSummary } = useNotes();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [summaryMarkdown, setSummaryMarkdown] = useState<string>();
  const [summaryUrl, setSummaryUrl] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const loadedRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const objectUrlRef = useRef('');

  const note = notes.find((item) => item.id === noteId) ?? null;

  useEffect(() => {
    if (!note || loadedRef.current) return;

    loadedRef.current = true;
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  // grava sozinho um instante depois de parar de digitar
  useEffect(() => {
    if (!note || !loadedRef.current) return;
    if (title === note.title && content === note.content) return;

    clearTimeout(timer.current);
    timer.current = setTimeout(() => updateNote(noteId, { title, content }), 600);

    return () => clearTimeout(timer.current);
  }, [content, note, noteId, title, updateNote]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  /** Carrega o material anexado, reaproveitando o que já foi baixado na aba. */
  useEffect(() => {
    const summary = note?.summary;

    if (!summary) {
      setSummaryMarkdown(undefined);
      setSummaryUrl('');
      return;
    }

    let active = true;

    const show = (blob: Blob) => {
      if (!active) return;

      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;
      setSummaryUrl(url);

      if (summary.filetype === 'md') blob.text().then((text) => active && setSummaryMarkdown(text));
      else setSummaryMarkdown(undefined);
    };

    const cached = readBlob(summary.id);

    if (cached) {
      show(cached);
      return;
    }

    setIsLoadingSummary(true);

    downloadSummaryFile(summary.id)
      .then((response) => {
        if (!active) return;

        if (!response.success || !response.data) {
          toast.error('Não conseguimos abrir esse resumo. Ele pode ter expirado.');
          return;
        }

        writeBlob(summary.id, response.data);
        show(response.data);
      })
      .finally(() => active && setIsLoadingSummary(false));

    return () => {
      active = false;
    };
  }, [note?.summary]);

  const handleAttach = (summary: NoteSummaryRef) => {
    attachSummary(noteId, summary);
    setIsPickerOpen(false);

    if (!title.trim()) setTitle(summary.filename.replace(/\.(pdf|md)$/i, ''));
  };

  const exportDocument = (current: Note) =>
    downloadNoteDocument({ ...current, title, content }, summaryMarkdown);

  const printDocument = (current: Note) =>
    printNoteDocument(
      { ...current, title, content },
      summaryMarkdown ? markdownToPrintHtml(summaryMarkdown) : undefined
    );

  if (!isReady)
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-52" />
        <div className="skeleton h-[60vh] rounded-2xl" />
      </div>
    );

  if (!note)
    return (
      <div className="card flex flex-col items-center gap-4 py-16 text-center">
        <p className="subtitle max-w-sm">Essa anotação não existe mais neste navegador.</p>
        <Link
          href="/caderno"
          className="focus-ring rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          Voltar ao caderno
        </Link>
      </div>
    );

  return (
    <section className="space-y-4">
      <Link
        href="/caderno"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle transition-colors hover:text-purple-700"
      >
        <ArrowLeft size={13} />
        Caderno
      </Link>

      <header className="flex flex-wrap items-center justify-between gap-3">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Título da anotação"
          className="min-w-0 flex-1 bg-transparent font-display text-title font-extrabold outline-none placeholder:font-sans placeholder:font-normal placeholder:text-faint"
        />

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => exportDocument(note)}
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <Download size={14} />
            Baixar documento
          </button>

          <button
            type="button"
            onClick={() => printDocument(note)}
            aria-label="Imprimir ou salvar em PDF"
            title="Imprimir ou salvar em PDF"
            className="focus-ring rounded-xl border border-line bg-surface p-2.5 text-subtle transition-colors hover:bg-canvas hover:text-ink"
          >
            <Printer size={15} />
          </button>
        </div>
      </header>

      {note.summary ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-line bg-surface px-4 py-2.5">
          <span className="flex min-w-0 items-center gap-2 text-xs">
            <FileText size={14} className="shrink-0 text-purple-600" />
            <span className="truncate font-semibold">{note.summary.filename}</span>
            <span className="chip bg-canvas uppercase text-subtle">{note.summary.filetype}</span>
          </span>

          <span className="flex items-center gap-3">
            {note.summary.youtubeUrl && (
              <a
                href={note.summary.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle transition-colors hover:text-purple-700"
              >
                <Youtube size={13} className="text-coral-500" />
                Vídeo
              </a>
            )}

            <Link
              href={`/meus-resumos/${note.summary.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle transition-colors hover:text-purple-700"
            >
              <BookOpen size={13} />
              Abrir
            </Link>

            <button
              type="button"
              onClick={() => detachSummary(noteId)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle transition-colors hover:text-coral-700"
            >
              <Unlink size={13} />
              Desanexar
            </button>
          </span>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsPickerOpen(true)}
          className="focus-ring flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-line-strong bg-surface px-4 py-3 text-sm font-semibold text-subtle transition-colors hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700"
        >
          <Link2 size={15} />
          Puxar um resumo da biblioteca
        </button>
      )}

      <div className={cn('grid gap-4', note.summary && 'lg:grid-cols-2')}>
        {note.summary && (
          <aside className="space-y-2 lg:sticky lg:top-20 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-wide text-subtle">Resumo</p>

            {isLoadingSummary || (!summaryMarkdown && !summaryUrl) ? (
              <div className="card flex min-h-[40vh] items-center justify-center">
                <Loading />
              </div>
            ) : note.summary.filetype === 'pdf' ? (
              <iframe
                src={summaryUrl}
                title={note.summary.filename}
                className="min-h-[65vh] w-full rounded-2xl border border-line bg-surface"
              />
            ) : (
              <div className="card max-h-[65vh] overflow-y-auto p-5">
                <MarkdownViewer content={summaryMarkdown ?? ''} />
              </div>
            )}
          </aside>
        )}

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wide text-subtle">Minhas anotações</p>

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={
              note.summary
                ? 'Escreva ao lado do resumo: tópicos, dúvidas, o que cai na prova...'
                : 'Comece a escrever. O que você digita fica salvo neste navegador.'
            }
            className="min-h-[65vh] w-full resize-y rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed outline-none transition-colors placeholder:text-faint focus:border-purple-300"
          />

          <p className="text-[11px] text-faint">
            Salvo automaticamente neste navegador · o download junta suas anotações
            {note.summary?.filetype === 'md' ? ' e o resumo em um arquivo só' : ''}.
          </p>
        </div>
      </div>

      <SummaryPicker
        isOpen={isPickerOpen}
        onSelect={handleAttach}
        onClose={() => setIsPickerOpen(false)}
      />
    </section>
  );
}
