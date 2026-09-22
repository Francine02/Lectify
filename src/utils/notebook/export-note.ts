import { Note } from '@/types/Note';

const stamp = () =>
  new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

const slug = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 50) || 'anotacoes';

/**
 * Monta o documento final: as anotações do usuário primeiro, e o resumo em
 * seguida quando ele é Markdown (PDF não dá para embutir no navegador).
 */
export const buildNoteDocument = (note: Note, summaryMarkdown?: string) => {
  const parts: string[] = [];

  parts.push(`# ${note.title.trim() || 'Anotações'}`);

  const meta = [`Exportado do Lectify em ${stamp()}`];

  if (note.summary) meta.push(`Material de origem: ${note.summary.filename}`);
  if (note.summary?.youtubeUrl) meta.push(`Vídeo: ${note.summary.youtubeUrl}`);

  parts.push(`> ${meta.join('  \n> ')}`);

  if (note.content.trim()) parts.push(`## Minhas anotações\n\n${note.content.trim()}`);

  if (note.links.length > 0)
    parts.push(
      `## Links salvos\n\n${note.links.map((link) => `- [${link.label}](${link.url})`).join('\n')}`
    );

  if (summaryMarkdown?.trim()) parts.push(`---\n\n## Resumo\n\n${summaryMarkdown.trim()}`);
  else if (note.summary?.filetype === 'pdf')
    parts.push(
      `---\n\n_O resumo de origem é um PDF e segue em arquivo separado (${note.summary.filename})._`
    );

  return parts.join('\n\n');
};

export const downloadNoteDocument = (note: Note, summaryMarkdown?: string) => {
  const content = buildNoteDocument(note, summaryMarkdown);
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${slug(note.title || 'anotacoes')}.md`;
  link.click();

  URL.revokeObjectURL(url);
};

/** Markdown → HTML simples, só o suficiente para a folha de impressão. */
export const markdownToPrintHtml = (markdown: string) => {
  const escape = (text: string) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const inline = (text: string) =>
    escape(text)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');

  const html: string[] = [];
  let list: string[] = [];

  const flush = () => {
    if (list.length === 0) return;

    html.push(`<ul>${list.map((item) => `<li>${inline(item)}</li>`).join('')}</ul>`);
    list = [];
  };

  markdown.split('\n').forEach((raw) => {
    const line = raw.trim();

    if (/^[-*]\s+/.test(line)) {
      list.push(line.replace(/^[-*]\s+/, ''));
      return;
    }

    flush();

    if (!line) return;
    if (line.startsWith('### ')) return void html.push(`<h3>${inline(line.slice(4))}</h3>`);
    if (line.startsWith('## ')) return void html.push(`<h2>${inline(line.slice(3))}</h2>`);
    if (line.startsWith('# ')) return void html.push(`<h2>${inline(line.slice(2))}</h2>`);

    html.push(`<p>${inline(line)}</p>`);
  });

  flush();

  return html.join('');
};

/**
 * Versão para impressão (e "salvar como PDF" do navegador). Usa um iframe
 * escondido para não depender de popup nem de biblioteca de PDF.
 */
export const printNoteDocument = (note: Note, summaryHtml?: string) => {
  const frame = document.createElement('iframe');

  frame.style.position = 'fixed';
  frame.style.right = '0';
  frame.style.bottom = '0';
  frame.style.width = '0';
  frame.style.height = '0';
  frame.style.border = '0';

  document.body.appendChild(frame);

  const escape = (text: string) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const paragraphs = (text: string) =>
    text
      .split(/\n{2,}/)
      .map((block) => `<p>${escape(block).replace(/\n/g, '<br/>')}</p>`)
      .join('');

  const document_ = frame.contentWindow?.document;

  if (!document_) return;

  document_.open();
  document_.write(`<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>${escape(note.title || 'Anotações')}</title>
    <style>
      @page { margin: 22mm 18mm; }
      body { font-family: Inter, system-ui, sans-serif; color: #1b1b26; line-height: 1.6; }
      h1 { font-size: 22px; margin: 0 0 4px; }
      h2 { font-size: 15px; margin: 24px 0 8px; color: #5a2fc9; }
      p, li { font-size: 12px; }
      .meta { font-size: 10px; color: #6c6c85; border-bottom: 1px solid #ebebf2; padding-bottom: 10px; }
      .links a { color: #5a2fc9; }
      .summary { border-top: 1px solid #ebebf2; margin-top: 24px; padding-top: 12px; }
    </style>
  </head>
  <body>
    <h1>${escape(note.title || 'Anotações')}</h1>
    <p class="meta">
      Exportado do Lectify em ${stamp()}
      ${note.summary ? `<br/>Material de origem: ${escape(note.summary.filename)}` : ''}
      ${note.summary?.youtubeUrl ? `<br/>Vídeo: ${escape(note.summary.youtubeUrl)}` : ''}
    </p>

    ${note.content.trim() ? `<h2>Minhas anotações</h2>${paragraphs(note.content)}` : ''}

    ${
      note.links.length > 0
        ? `<h2>Links salvos</h2><ul class="links">${note.links
            .map((link) => `<li><a href="${escape(link.url)}">${escape(link.label)}</a></li>`)
            .join('')}</ul>`
        : ''
    }

    ${summaryHtml ? `<div class="summary"><h2>Resumo</h2>${summaryHtml}</div>` : ''}
  </body>
</html>`);
  document_.close();

  frame.contentWindow?.focus();
  frame.contentWindow?.print();

  // o iframe só pode sair depois que a caixa de impressão fecha
  setTimeout(() => frame.remove(), 60_000);
};
