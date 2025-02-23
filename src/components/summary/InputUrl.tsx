import { useTranslation } from "react-i18next";

export function InputUrl() {
    const { t } = useTranslation();

    return (
        <div className="w-full sm:w-96 md:w-[30rem] m-auto mb-4">
            <div className="relative">
                <div className="m-3 p-[0.11rem] rounded-full bg-gradient-to-t from-rosa via-rosa-secundary to-bege">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                        className="p-1.5 md:p-2 placeholder:p-2.5 w-full rounded-full bg-bg-components focus:outline-none"
                        type="text"
                        id="name"
                        placeholder={t('hero.page2.url')}
                    />
                </div>
                <div className="absolute top-1 md:top-1.5 right-5 p-0.5 rounded-2xl bg-gradient-to-t from-[#FF005B] to-[#F2D3AC]">
                    <button
                        type="button"
                        className="flex items-center rounded-2xl bg-white py-1 px-2.5 text-center text-sm text-black transition-all shadow-sm hover:shadow cursor-pointer hover:opacity-90 active:opacity-85">
                        {t('hero.page2.button')}
                    </button>
                </div>
            </div>
        </div>
    );
}
