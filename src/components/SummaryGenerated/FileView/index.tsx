import { PdfViewer } from '@/components/PdfViewer';
import { FileViewProps } from './FileViewProps';

export function FileView({ url }: FileViewProps) {
    return (
        <div className="w-full h-fit">
            <PdfViewer url={url} />
        </div>
    );
}
