export function PdfViewer() {
  return (
    <div className="w-full">
      <iframe src="/assets/teste.pdf" className="w-full min-h-[60vh]" title="Resumo gerado" />

      <p className="mt-2 text-sm">
        Se o PDF não abrir, você pode{' '}
        <a href="/assets/teste.pdf" className="underline">
          baixar o arquivo
        </a>
        .
      </p>
    </div>
  );
}
