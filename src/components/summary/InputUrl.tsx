import { useTranslation } from "react-i18next";

export function InputUrl() {
    const { t } = useTranslation();

    return (
        <div className="w-full sm:w-96 md:w-[30rem] m-auto mb-4">
            <div className="relative">
                <div className="m-3 p-[0.11rem] rounded-full bg-gradient-to-t from-rosa via-rosa-secundary to-bege">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                        className=" pl-5 pr-20 py-2 w-full rounded-full bg-bg-components focus:outline-none"
                        type="text"
                        id="name"
                        placeholder={t('hero.page2.url')}
                    />
                </div>
                <div className="absolute h-full top-0 right-3 p-0.5 rounded-full bg-gradient-to-t from-[#FF005B] to-[#F2D3AC]">
                    <button
                        type="button"
                        className="flex h-full items-center rounded-full bg-white py-1 px-4 text-center text-sm font-semibold transition-all shadow-sm hover:shadow cursor-pointer hover:opacity-90 active:opacity-85">
                        {t('hero.page2.button')}
                    </button>
                </div>
            </div>
        </div>
    );
}
