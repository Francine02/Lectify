'use client';

import { useTools } from '@/contexts/Tools';
import { useNotes } from '@/hooks/useNotes';
import { cn } from '@/utils/cn';
import { ArrowUpRight, Check, NotebookPen, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Captura rápida: anota uma ideia ou cola um link sem sair da tela. Vai direto
 * para o caderno, que fica salvo no navegador.
 */
export function QuickNote() {
  const { createNote } = useNotes();
  const { openTool, toggle, close } = useTools();
  const [text, setText] = useState('');

  const isOpen = openTool === 'note';
  const [isSaved, setIsSaved] = useState(false);

  const save = () => {
    const content = text.trim();
    if (!content) return;

    const [firstLine, ...rest] = content.split('\n');
    const isLink = /^https?:\/\/\S+$/i.test(firstLine);

    createNote({
      title: isLink ? 'Link salvo' : firstLine.slice(0, 60),
      content: isLink ? rest.join('\n') : content,
      links: isLink
        ? [{ id: 'quick', url: firstLine, label: firstLine.replace(/^https?:\/\//, '') }]
        : [],
    });

    setText('');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1600);
  };

  return (
    <div className="pointer-events-auto flex flex-col items-end gap-2">
      {isOpen && (
        <section className="w-[268px] animate-pop-in rounded-2xl border border-line bg-surface p-4 shadow-float">
          <header className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-subtle">
              <NotebookPen size={13} className="text-sun-500" />
              Anotação rápida
            </p>

            <button
              type="button"
              onClick={close}
              aria-label="Fechar anotação"
              className="focus-ring rounded-lg p-1 text-faint transition-colors hover:bg-canvas hover:text-ink"
            >
              <X size={15} />
            </button>
          </header>

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) save();
            }}
            rows={4}
            placeholder="Um tópico do resumo, uma dúvida ou um link para estudar depois..."
            className="w-full resize-none rounded-xl border border-line bg-canvas p-3 text-sm outline-none transition-colors placeholder:text-faint focus:border-purple-400 focus:bg-surface"
          />

          <div className="mt-3 flex items-center justify-between gap-2">
            <Link
              href="/caderno"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-subtle transition-colors hover:text-purple-700"
            >
              Abrir caderno
              <ArrowUpRight size={12} />
            </Link>

            <button
              type="button"
              onClick={save}
              disabled={!text.trim()}
              className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-line-strong"
            >
              {isSaved ? <Check size={13} /> : null}
              {isSaved ? 'Salvo' : 'Salvar'}
            </button>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => toggle('note')}
        aria-label="Anotação rápida"
        className={cn(
          'focus-ring rounded-full border border-line bg-surface p-3 text-ink shadow-lift transition-colors hover:border-line-strong',
          !isOpen && 'lg:hidden'
        )}
      >
        <NotebookPen size={16} />
      </button>
    </div>
  );
}
