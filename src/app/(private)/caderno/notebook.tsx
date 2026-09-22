'use client';

import { NoteCard } from '@/components/Notebook/NoteCard';
import { SummaryPicker } from '@/components/Notebook/SummaryPicker';
import { useNotes } from '@/hooks/useNotes';
import { NoteSummaryRef } from '@/types/Note';
import { FileText, NotebookPen, Plus, Search, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Notebook() {
  const router = useRouter();
  const { notes, isReady, createNote, updateNote, removeNote, togglePin, addLink, removeLink, noteForSummary } =
    useNotes();

  const [search, setSearch] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  /** Abre a folha daquele resumo — ou cria uma, se for a primeira vez. */
  const openSummaryNote = (summary: NoteSummaryRef) => {
    setIsPickerOpen(false);

    const existing = noteForSummary(summary.id);

    if (existing) {
      router.push(`/caderno/${existing.id}`);
      return;
    }

    const note = createNote({
      title: summary.filename.replace(/\.(pdf|md)$/i, ''),
      summary,
    });

    router.push(`/caderno/${note.id}`);
  };

  const visible = notes.filter((note) => {
    if (!search.trim()) return true;

    const term = search.toLowerCase();

    return (
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term) ||
      note.links.some((link) => link.url.toLowerCase().includes(term))
    );
  });

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-title font-extrabold">Caderno</h1>
          <p className="subtitle">
            Tópicos dos resumos, anotações e links — guardados neste navegador.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-canvas"
          >
            <FileText size={15} />
            Escrever sobre um resumo
          </button>

          <button
            type="button"
            onClick={() => createNote()}
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <Plus size={15} />
            Nova anotação
          </button>
        </div>
      </header>

      <p className="flex items-center gap-2 rounded-2xl bg-mint-50 px-4 py-3 text-xs text-mint-700">
        <ShieldCheck size={14} className="shrink-0" />
        Suas anotações ficam salvas só no seu dispositivo — não passam pela nossa API.
      </p>

      {notes.length > 0 && (
        <div className="relative max-w-sm">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar nas anotações"
            className="w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-faint focus:border-purple-400"
          />
        </div>
      )}

      {!isReady && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((key) => (
            <div key={key} className="skeleton h-56 rounded-2xl" />
          ))}
        </div>
      )}

      {isReady && notes.length === 0 && (
        <div className="card flex flex-col items-center gap-3 border-dashed py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-sun-50 text-sun-700">
            <NotebookPen size={24} />
          </span>

          <div className="space-y-1">
            <h2 className="font-display text-base font-extrabold">Seu caderno está vazio</h2>
            <p className="subtitle mx-auto max-w-sm">
              Crie uma anotação para guardar os tópicos de um resumo, dúvidas para revisar depois ou
              links de apoio.
            </p>
          </div>

          <button
            type="button"
            onClick={() => createNote()}
            className="focus-ring mt-2 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <Plus size={15} />
            Criar a primeira
          </button>
        </div>
      )}

      {visible.length > 0 && (
        <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onChange={(patch) => updateNote(note.id, patch)}
              onRemove={() => removeNote(note.id)}
              onTogglePin={() => togglePin(note.id)}
              onAddLink={(url) => addLink(note.id, url)}
              onRemoveLink={(linkId) => removeLink(note.id, linkId)}
            />
          ))}
        </div>
      )}

      <SummaryPicker
        isOpen={isPickerOpen}
        onSelect={openSummaryNote}
        onClose={() => setIsPickerOpen(false)}
      />

      {isReady && notes.length > 0 && visible.length === 0 && (
        <p className="card py-12 text-center text-sm text-subtle">
          Nenhuma anotação encontrada para “{search}”.
        </p>
      )}
    </section>
  );
}
