import { useTranslation } from "react-i18next";

interface OptionProps {
    alternative: string,
    selected: string,
    onClick: () => void,
    response: string,
    justification: string
}

export function Option({ alternative, selected, onClick, response, justification }: OptionProps) {
    const { t } = useTranslation();
    const isSelectedCorrect = selected === response && selected === alternative;
    const isSelectedWrong = selected !== response && selected === alternative;
    const isSelected = selected.length > 1 && response === alternative;

    return (
        <>
            <button
                disabled={selected.length > 1}
                onClick={onClick}
                className={`${isSelectedCorrect ? 'bg-green-200' : isSelectedWrong ? 'bg-red-200' : 'bg-bg-components'} ${isSelected ? 'bg-green-200 cursor-text pointer-events-none' : selected.length > 1 && 'cursor-text pointer-events-none'} bg-bg-components w-full md:w-[35rem] max-h-44 overflow-y-auto rounded-lg p-2 px-5 sm:px-7 mx-auto mb-5 cursor-pointer`}>
                <p>{alternative}</p>
                {isSelected &&
                    <p className="text-justify mt-5 font-medium text-sm">
                        <span className="font-black">{t('hero.page4.justification')} </span>
                        {justification}
                    </p>}
            </button>

        </>
    )
}