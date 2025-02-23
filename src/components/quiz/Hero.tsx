import { useTranslation } from "react-i18next";
import { Title } from "../home/Title";
import { SelectOption } from "../home/SelectOption";
import { Logo } from "../home/Logo";
import { Dropzone } from "./Dropzone";
import { Button } from "./Button";


export function Hero() {
    const { t } = useTranslation();

    return (
        <>
            <Logo />
            <Title title={t('hero.title.test')} emphasis={t('hero.title.testLine')} />
            <SelectOption title={t('hero.page3.file')} />

            <Dropzone/>

            <Button/>
        </>
    )
}