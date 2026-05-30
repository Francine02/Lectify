import { FileViewProps } from '../SummaryGenerated/FileView/FileViewProps';

export function PdfViewer({ url }: FileViewProps) {
    return (
        <div className="w-full">
            <iframe src={url} className="w-full min-h-[60vh]" title="Resumo gerado" />

            <p className="mt-2 text-sm">
                Se não abrir, você pode{' '}
                <a target='_blank' href={url} className="underline">
                    baixar o arquivo
                </a>
                .
            </p>
        </div>
    );
}
