'use client';

import { Note, NoteColor, NoteLink, NoteSummaryRef } from '@/types/Note';
import { LOCAL_KEYS, readLocal, subscribeLocal, writeLocal } from '@/utils/storage/local-store';
import { useCallback, useEffect, useState } from 'react';

const uid = () => Math.random().toString(36).slice(2, 10);

const sortNotes = (notes: Note[]) =>
  [...notes].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

const read = () => sortNotes(readLocal<Note[]>(LOCAL_KEYS.notes, []));

/** Caderno do usuário: fica no navegador, sem passar pela API. */
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setNotes(read());
    setIsReady(true);

    return subscribeLocal(LOCAL_KEYS.notes, () => setNotes(read()));
  }, []);

  const persist = useCallback((next: Note[]) => {
    const sorted = sortNotes(next);

    setNotes(sorted);
    writeLocal(LOCAL_KEYS.notes, sorted);
  }, []);

  const createNote = useCallback(
    (partial: Partial<Note> = {}) => {
      const now = new Date().toISOString();

      const note: Note = {
        id: uid(),
        title: '',
        content: '',
        links: [],
        color: 'purple',
        isPinned: false,
        createdAt: now,
        updatedAt: now,
        ...partial,
      };

      persist([note, ...read()]);

      return note;
    },
    [persist]
  );

  const updateNote = useCallback(
    (id: string, patch: Partial<Omit<Note, 'id' | 'createdAt'>>) => {
      persist(
        read().map((note) =>
          note.id === id ? { ...note, ...patch, updatedAt: new Date().toISOString() } : note
        )
      );
    },
    [persist]
  );

  const removeNote = useCallback(
    (id: string) => persist(read().filter((note) => note.id !== id)),
    [persist]
  );

  const togglePin = useCallback(
    (id: string) => {
      const note = read().find((item) => item.id === id);
      if (note) updateNote(id, { isPinned: !note.isPinned });
    },
    [updateNote]
  );

  const setColor = useCallback(
    (id: string, color: NoteColor) => updateNote(id, { color }),
    [updateNote]
  );

  const addLink = useCallback(
    (id: string, url: string, label?: string) => {
      const note = read().find((item) => item.id === id);
      if (!note) return;

      const link: NoteLink = { id: uid(), url, label: label?.trim() || url.replace(/^https?:\/\//, '') };

      updateNote(id, { links: [...note.links, link] });
    },
    [updateNote]
  );

  const removeLink = useCallback(
    (id: string, linkId: string) => {
      const note = read().find((item) => item.id === id);
      if (!note) return;

      updateNote(id, { links: note.links.filter((link) => link.id !== linkId) });
    },
    [updateNote]
  );

  const attachSummary = useCallback(
    (id: string, summary: NoteSummaryRef) => updateNote(id, { summary }),
    [updateNote]
  );

  const detachSummary = useCallback(
    (id: string) => updateNote(id, { summary: undefined }),
    [updateNote]
  );

  /** Uma anotação por resumo: reabrir o mesmo material volta para a mesma folha. */
  const noteForSummary = useCallback(
    (summaryId: string) => read().find((note) => note.summary?.id === summaryId) ?? null,
    []
  );

  return {
    notes,
    isReady,
    createNote,
    updateNote,
    removeNote,
    togglePin,
    setColor,
    addLink,
    removeLink,
    attachSummary,
    detachSummary,
    noteForSummary,
  };
}
