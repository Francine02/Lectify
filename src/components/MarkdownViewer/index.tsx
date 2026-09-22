import { Fragment, ReactNode } from 'react';

/**
 * Renderizador mínimo de Markdown — suficiente para o material gerado pela API
 * (títulos, listas, negrito, código). Monta elementos React, nunca HTML cru.
 */
const renderInline = (text: string): ReactNode => {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**'))
      return (
        <strong key={index} className="font-semibold">
          {token.slice(2, -2)}
        </strong>
      );

    if (token.startsWith('`') && token.endsWith('`'))
      return (
        <code key={index} className="rounded bg-canvas px-1.5 py-0.5 text-[0.85em]">
          {token.slice(1, -1)}
        </code>
      );

    return <Fragment key={index}>{token}</Fragment>;
  });
};

export function MarkdownViewer({ content }: { content: string }) {
  const lines = content.split('\n');
  const blocks: ReactNode[] = [];

  let listItems: string[] = [];
  let codeLines: string[] = [];
  let inCodeBlock = false;

  const flushList = () => {
    if (listItems.length === 0) return;

    blocks.push(
      <ul key={`list-${blocks.length}`} className="ml-5 list-disc space-y-1.5 text-sm text-ink/80">
        {listItems.map((item, index) => (
          <li key={index}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  const flushCode = () => {
    if (codeLines.length === 0) return;

    blocks.push(
      <pre
        key={`code-${blocks.length}`}
        className="overflow-x-auto rounded-lg bg-purple-900 p-4 text-xs text-white/90"
      >
        <code>{codeLines.join('\n')}</code>
      </pre>
    );
    codeLines = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) flushCode();
      else flushList();

      inCodeBlock = !inCodeBlock;
      return;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      return;
    }

    if (line.startsWith('### ')) {
      flushList();
      blocks.push(
        <h3 key={`h3-${blocks.length}`} className="pt-2 text-base font-semibold">
          {renderInline(line.slice(4))}
        </h3>
      );
      return;
    }

    if (line.startsWith('## ')) {
      flushList();
      blocks.push(
        <h2 key={`h2-${blocks.length}`} className="pt-3 text-lg font-semibold text-purple-700">
          {renderInline(line.slice(3))}
        </h2>
      );
      return;
    }

    if (line.startsWith('# ')) {
      flushList();
      blocks.push(
        <h1 key={`h1-${blocks.length}`} className="text-xl font-black">
          {renderInline(line.slice(2))}
        </h1>
      );
      return;
    }

    if (/^[-*]\s+/.test(line.trim())) {
      listItems.push(line.trim().replace(/^[-*]\s+/, ''));
      return;
    }

    flushList();

    if (line.trim() === '') return;

    blocks.push(
      <p key={`p-${blocks.length}`} className="text-sm leading-relaxed text-ink/80">
        {renderInline(line)}
      </p>
    );
  });

  flushList();
  flushCode();

  return <article className="space-y-3">{blocks}</article>;
}
