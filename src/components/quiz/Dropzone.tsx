import { useTranslation } from "react-i18next";

export function Dropzone() {
    const { t } = useTranslation();

    return (

        <div className="flex items-center justify-center m-auto pt-4">
            <div className="p-0.5 rounded-3xl bg-gradient-to-t from-rosa via-rosa-secundary to-bege">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full sm:w-[30rem] h-28 border-2 border-dashed border-transparent rounded-3xl cursor-pointer bg-bg-components hover:bg-gray-100 p-6 sm:p-8 md:p-10"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <img
                            className="w-12"
                            src="/assets/Upload.png"
                            alt="upload" />
                        <p className="mb-2 text-sm font-black">
                            {t("hero.page3.addFile")}
                        </p>
                        <p className="text-xs font-extralight">PDF - MD</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
        </div>
    );
}
