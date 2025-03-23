export function Error({ text, className }: { text: string | undefined, className?: string }) {
    return (
        <div className={`text-sm font-bold flex items-center gap-2 ${className}`}>
            <img src="./assets/info.png" alt="Alerta de erro" className="w-4 h-4" />
            <p className="text-red-500">
                {text}
            </p>
        </div>
    )
}