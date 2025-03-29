import { File } from "@/src/components/file/File";
import { useTranslation } from "react-i18next";
import { Subtitle } from "../../text/Subtitle";
import { FileSummaryProps } from "./FileSummaryProps";
import { ButtonFeedback } from "../../buttonFeedback/ButtonFeedback";

export function FileSummary({ format, url }: FileSummaryProps) {
    const { t } = useTranslation();

    return (
        <div className="text-center space-y-2">
            <Subtitle title={t('hero.page2.success')} />
            <File>
                <a className="text-blue-600 underline active:text-purple-600 focus:text-purple-600 "
                    href={url}
                    download={`${t('hero.page2.summary')}.${format}`}>
                    {t('hero.page2.summary')}.{format}
                </a>
            </File>
            <p className="pt-5 text-sm">{t('hero.page2.shared')}</p>

            <p className="pb-2 text-sm">{t('hero.page2.feedback')}</p>
            <ButtonFeedback/>
        </div>
    )
}