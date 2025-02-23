import { useTranslation } from "react-i18next";

export function Button() {
    const { t } = useTranslation();
    return (
        <div className="pt-5 grid items-center justify-center hover:brightness-[96%] cursor-pointer transition duration-100 ease-in-out m-auto sm:m-0">
            <div className="rounded-xl bg-gradient-to-t from-rosa to-bege p-[0.1rem] hover:from-bege hover:to-rosa transition duration-100 ease-in-out">
                <div className="grid items-center justify-center bg-bg-components px-14 py-1.5 rounded-xl w-20">

                    <p className="text-center text-[0.8rem] sm:text-[1rem] font-bold text-text">
                    {t("hero.page3.button")}
                    </p>
                </div>
            </div>
        </div>

    )
}