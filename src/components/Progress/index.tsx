export function Progress({ value }: { value: string }) {
    return (
        <div className="relative size-40 w-full">
            <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-800/10" strokeWidth="2"></circle>
                <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-purple-700 transition-all duration-700 ease-out"
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset={100 - Number(value)}
                    strokeLinecap="round"
                ></circle>
            </svg>

            <div className="absolute top-1/2 inset-s-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-2xl font-bold text-purple-700">{value}%</span>
            </div>
        </div>
    );
}
