import { Card } from "@/src/components/home/Card";
import { LogoPink } from "@/src/components/logos/LogoPink";
import { Subtitle } from "@/src/components/text/Subtitle";
import { Title } from "@/src/components/text/Title";
import { useTranslation } from "react-i18next";

export function Hero() {
    const { t } = useTranslation();

    return (
        <>
            <LogoPink />
            <Title useSparkles title={t('hero.title.start')} emphasis={t('hero.title.startLine')} />
            <Subtitle title={t('hero.page1.option')} />

            <div className="sm:flex gap-5 md:gap-8 lg:gap-10 justify-center">
                <Card href="/summary" text={t('hero.page1.summary')} img="/assets/Icon-resumo.png" />
                <Card href="/quiz" text={t('hero.page1.quiz')} img="/assets/Icon-quiz.png" />
            </div>
        </>
    )
}