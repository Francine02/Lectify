import { Loading } from "./Loading";

interface ButtonProps {
    onClick: (e: React.FormEvent) => void,
    loading?: boolean,
    text: string,
    disabled?: boolean,
    secondary?: boolean,
    className?: string
}

export function Button({ onClick, loading, text, disabled, secondary, className }: ButtonProps) {
    return (
        <button disabled={disabled} className={`${className ? className : 'text-center text-[0.8rem] sm:text-[1rem] font-bold px-14 py-1.5 rounded-lg w-20'}  relative grid items-center justify-center transition duration-100 ease-in-out
                ${secondary ? 'cursor-not-allowed bg-bg-components border-[0.1rem] border-gray-300' : 'bg-black text-white before:bg-[linear-gradient(90deg,#ff4242,#a1ff42,#42a1ff,#42d0ff,#a142ff)] before:bottom-[-3px] before:left-0 before:opacity-60 before:absolute before:inset-0 before:-z-50 before:blur-md before:w-full before:h-full before:rounded-xl'}
                ${disabled ? 'cursor-not-allowed' : secondary ? 'cursor-pointer hover:brightness-[96%]' : 'hover:bg-[#1c1c1c] cursor-pointer'} `} onClick={onClick}>

            {loading ? (
                <Loading />
            ) : (
                <p>
                    {text}
                </p>
            )}
        </button>

    )
}