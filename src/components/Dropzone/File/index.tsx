import { LuDelete } from 'react-icons/lu';
import { FileProps } from './FileProps';

export function File({ text, onDelete }: FileProps) {
    return (
        <div className="text-gray-400 w-full max-w-96 p-5 flex justify-between items-center rounded-lg bg-gray-50 mx-auto gap-2">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                Arquivo: <span className="font-semibold text-gray-500">{text}</span>
            </div>

            <button
                type="button"
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                aria-label="Remover arquivo"
            >
                <LuDelete size={18} />
            </button>
        </div>
    );
}
