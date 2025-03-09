interface ButtonProps {
    text: string,
    onClick: () => void
}

export function Button({ text, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="flex h-full items-center rounded-full bg-white py-1 px-4 text-center text-sm font-semibold transition-all shadow-sm hover:shadow cursor-pointer hover:opacity-90 active:opacity-85">
            {text}
        </button>
    )
}