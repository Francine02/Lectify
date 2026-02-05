import { FaFileAlt } from 'react-icons/fa';
import { FileView } from './FileView';
import { SummaryGeneratedProps } from './SummaryGeneratedProps';

export function SummaryGenerated({ hasSummary = false, url, format }: SummaryGeneratedProps) {
  return (
    <>
      {hasSummary ? (
        <FileView url={url} format={format} />
      ) : (
        <p className="text-gray-400 text-center text-sm italic">
          <FaFileAlt className="mx-auto text-3xl mb-2" />
          Nenhum resumo foi gerado ainda. Assim que você criar um, ele aparecerá aqui.
        </p>
      )}
    </>
  );
}
