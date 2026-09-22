'use client';

import { Note, NoteColor } from '@/types/Note';
import { cn } from '@/utils/cn';
import { Check, ExternalLink, FileText, Link2, Maximize2, Pin, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const COLORS: Record<NoteColor, { card: string; dot: string; chip: string }> = {
  purple: { card: 'border-t-purple-500', dot: 'bg-purple-500', chip: 'bg-purple-50 text-purple-700' },
  mint: { card: 'border-t-mint-500', dot: 'bg-mint-500', chip: 'bg-mint-50 text-mint-700' },
  sun: { card: 'border-t-sun-500', dot: 'bg-sun-500', chip: 'bg-sun-50 text-sun-700' },
  sky: { card: 'border-t-sky-500', dot: 'bg-sky-500', chip: 'bg-sky-50 text-sky-700' },
};

const COLOR_LIST = Object.keys(COLORS) as NoteColor[];

type NoteCardProps = {
  note: Note;
  onChange: (patch: Partial<Note>) => void;
  onRemove: () => void;
  onTogglePin: () => void;
  onAddLink: (url: string) => void;
  onRemoveLink: (linkId: string) => void;
};

export function NoteCard({
  note,
  onChange,
  onRemove,
  onTogglePin,
  onAddLink,
  onRemoveLink,
}: NoteCardProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [linkDraft, setLinkDraft] = useState('');
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // grava sozinho um instante depois de parar de digitar
  useEffect(() => {
    if (title === note.title && content === note.content) return;

    clearTimeout(timer.current);
    timer.current = setTimeout(() => onChange({ title, content }), 600);

    return () => clearTimeout(timer.current);
  }, [content, note.content, note.title, onChange, title]);

  const addLink = () => {
    const url = linkDraft.trim();
    if (!url) return;

    onAddLink(/^https?:\/\//i.test(url) ? url : `https://${url}`);
    setLinkDraft('');
    setIsAddingLink(false);
  };

  const palette = COLORS[note.color] ?? COLORS.purple;

  return (
    <article className={cn('card flex flex-col gap-3 border-t-4 p-4', palette.card)}>
      <div className="flex items-start gap-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Título da anotação"
          className="min-w-0 flex-1 bg-transparent font-display text-sm font-extrabold outline-none placeholder:font-sans placeholder:font-normal placeholder:text-faint"
        />

        <Link
          href={`/caderno/${note.id}`}
          aria-label="Abrir em tela cheia"
          title="Abrir ao lado do resumo"
          className="focus-ring rounded-lg p-1.5 text-faint transition-colors hover:text-purple-700"
        >
          <Maximize2 size={14} />
        </Link>

        <button
          type="button"
          onClick={onTogglePin}
          aria-label={note.isPinned ? 'Desafixar' : 'Fixar no topo'}
          className={cn(
            'focus-ring rounded-lg p-1.5 transition-colors',
            note.isPinned ? 'text-purple-700' : 'text-faint hover:text-ink'
          )}
        >
          <Pin size={14} className={cn(note.isPinned && 'fill-current')} />
        </button>

        <button
          type="button"
          onClick={() => setIsConfirmingRemove((previous) => !previous)}
          aria-label="Excluir anotação"
          className="focus-ring rounded-lg p-1.5 text-faint transition-colors hover:text-coral-700"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {isConfirmingRemove && (
        <div className="flex items-center justify-between gap-2 rounded-xl bg-coral-50 px-3 py-2 text-xs text-coral-700">
          Excluir esta anotação?
          <div className="flex gap-1">
            <button
              type="button"
              onClick={onRemove}
              className="rounded-lg bg-coral-500 px-2 py-1 font-semibold text-white"
            >
              Excluir
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmingRemove(false)}
              className="rounded-lg px-2 py-1 font-semibold"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {note.summary && (
        <Link
          href={`/caderno/${note.id}`}
          className={cn(
            'inline-flex w-fit max-w-full items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-semibold transition-opacity hover:opacity-80',
            palette.chip
          )}
        >
          <FileText size={11} className="shrink-0" />
          <span className="truncate">{note.summary.filename}</span>
        </Link>
      )}

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={5}
        placeholder="Tópicos do resumo, dúvidas, fórmulas..."
        className="w-full resize-y rounded-xl bg-canvas p-3 text-sm leading-relaxed outline-none transition-colors placeholder:text-faint focus:bg-surface focus:ring-1 focus:ring-line-strong"
      />

      {note.links.length > 0 && (
        <ul className="space-y-1.5">
          {note.links.map((link) => (
            <li key={link.id} className="flex items-center gap-2">
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  'inline-flex min-w-0 flex-1 items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium transition-opacity hover:opacity-80',
                  palette.chip
                )}
              >
                <ExternalLink size={11} className="shrink-0" />
                <span className="truncate">{link.label}</span>
              </a>

              <button
                type="button"
                onClick={() => onRemoveLink(link.id)}
                aria-label="Remover link"
                className="focus-ring rounded-lg p-1 text-faint transition-colors hover:text-coral-700"
              >
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {isAddingLink ? (
        <div className="flex items-center gap-2">
          <input
            value={linkDraft}
            autoFocus
            onChange={(event) => setLinkDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') addLink();
              if (event.key === 'Escape') setIsAddingLink(false);
            }}
            placeholder="cole um link"
            className="min-w-0 flex-1 rounded-lg border border-line bg-canvas px-2.5 py-1.5 text-xs outline-none focus:border-purple-400"
          />

          <button
            type="button"
            onClick={addLink}
            aria-label="Salvar link"
            className="focus-ring rounded-lg bg-brand p-1.5 text-white"
          >
            <Check size={13} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAddingLink(true)}
          className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-subtle transition-colors hover:text-purple-700"
        >
          <Link2 size={13} />
          Adicionar link
        </button>
      )}

      <footer className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3">
        <div className="flex items-center gap-1.5">
          {COLOR_LIST.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange({ color })}
              aria-label={`Cor ${color}`}
              className={cn(
                'size-4 rounded-full transition-transform',
                COLORS[color].dot,
                note.color === color ? 'scale-110 ring-2 ring-line-strong ring-offset-2' : 'opacity-60'
              )}
            />
          ))}
        </div>

        <span className="text-[11px] text-faint">
          {new Date(note.updatedAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
          })}
        </span>
      </footer>
    </article>
  );
}

export { COLORS as NOTE_COLORS };
