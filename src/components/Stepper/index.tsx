export function Stepper() {
    return (
        <ul className="relative flex flex-row gap-x-2 max-w-xs mx-auto">
            <li className="shrink basis-0 flex-1 group">
                <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                    <span className="size-7 flex justify-center items-center shrink-0 bg-gray-100 dark:bg-neutral-700 font-medium text-gray-800 dark:text-neutral-200 rounded-full">
                        3
                    </span>
                    <div className="ms-2 w-full h-px flex-1 bg-gray-200 dark:bg-neutral-600 group-last:hidden"></div>
                </div>
            </li>
        </ul>
    );
}
