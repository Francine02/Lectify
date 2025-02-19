import { useTranslation } from "react-i18next";
import { Card } from "./Card";
import { Logo } from "./Logo";
import { SelectOption } from "./SelectOption";
import { Title } from "./Title";

export function Hero() {
    const { t } = useTranslation();

    return (
        <>
            <Logo />
            <Title title={t('hero.title.start')} emphasis={t('hero.title.startLine')} />
            <SelectOption title={t('hero.page1.option')} />

            <div className="sm:flex gap-5 md:gap-8 lg:gap-10 justify-center">
                <Card text={t('hero.page1.summary')} img="/assets/Icon-resumo.png" />
                <Card text={t('hero.page1.quiz')} img="/assets/Icon-quiz.png" />
            </div>
        </>
    )
}