import { t } from "i18next";
import { FileProps } from "./FileProps";

export function File({ children, text }: FileProps) {
    return (
        <p className="text-[#868686] w-full max-w-96 overflow-auto p-3 flex justify-center items-center max-h-40 rounded-lg cursor-text bg-bg-components">
            {t("hero.page3.fileIn")}:
            <span className="font-semibold">
                {children ? children : text}
            </span>
        </p>
    )
}