'use client';

import { Loading } from '@/components/Loading';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import { useEffect, useState } from 'react';

type SummaryPanelProps = {
  url: string;
  blob: Blob;
  format: 'pdf' | 'md';
};

export function SummaryPanel({ url, blob, format }: SummaryPanelProps) {
  const [markdown, setMarkdown] = useState<string>();

  useEffect(() => {
    if (format !== 'md') return;

    let active = true;
    blob.text().then((text) => {
      if (active) setMarkdown(text);
    });

    return () => {
      active = false;
    };
  }, [blob, format]);

  if (format === 'pdf')
    return (
      <div className="space-y-2">
        <iframe
          src={url}
          className="min-h-[65vh] w-full rounded-2xl border border-line bg-surface"
          title="Resumo gerado"
        />
        <p className="text-xs text-subtle">
          Não abriu?{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href={url}
            className="font-semibold underline hover:text-purple-700"
          >
            Abrir em outra aba
          </a>
          .
        </p>
      </div>
    );

  if (markdown === undefined)
    return (
      <div className="card flex min-h-[40vh] items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="card max-h-[65vh] overflow-y-auto p-6">
      <MarkdownViewer content={markdown} />
    </div>
  );
}
