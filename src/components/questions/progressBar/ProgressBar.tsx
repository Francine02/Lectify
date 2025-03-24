import { ProgressBarProps } from "./ProgressBarProps";

export function ProgressBar({ count, number }: ProgressBarProps) {

    return (
        <div className="flex gap-3 justify-center items-center">
            <p className={` w-6 h-6 border-[0.1rem] ${count === number ? 'bg-rosa-secundary border-rosa text-white' : 'bg-bg-components border-gray-300 text-gray-500'} rounded-full text-sm flex items-center justify-center`}>{number}</p>
            {number < 5 && <p className="pr-3"> - </p> }
        </div>
    )
}