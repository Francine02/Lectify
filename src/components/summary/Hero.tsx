import { useTranslation } from "react-i18next";
import { Logo } from "../home/Logo";
import { Title } from "../home/Title";
import { SelectOption } from "../home/SelectOption";
import { Radio } from "./Radio";
import React, { useState } from "react";
import { InputUrl } from "./InputUrl";

export function Hero() {
    const { t, i18n } = useTranslation();
    const [selectedFormat, setSelectedFormat] = useState("pdf");

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFormat(e.target.value);
    }

    return (
        <>
            <Logo />
            <Title
                title={t('hero.title.summary')}
                emphasis={t('hero.title.summaryLine')}
                titleContinuation={i18n.language === 'pt' ? " automático." : ""} />

            <InputUrl />


            <div className="sm:flex space-x-5 justify-center">
                <SelectOption title={t('hero.page2.formate')} />
                <Radio
                    checked={selectedFormat === "pdf"}
                    onChange={handleRadioChange}
                    value="pdf"
                    text="PDF" />
                <Radio
                    checked={selectedFormat === "md"}
                    onChange={handleRadioChange}
                    value="md"
                    text="Markdown" />
            </div>
        </>
    )
}