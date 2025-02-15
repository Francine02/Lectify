import { useTranslation } from "react-i18next";
import { Header } from "../header/Header";
import { Logo } from "./Logo";
import { Title } from "./Title";
import { SelectOption } from "./SelectOption";
import { Card } from "./Card";
import resume from "../../assets/Icon-resumo.png";
import quiz from "../../assets/Icon-quiz.png";

export function Hero() {
    const { t } = useTranslation();

    return (
        <>
            <Header />
            <Logo />
            <Title title={t('hero.title.start')} emphasis={t('hero.title.startLine')} />
            <SelectOption title={t('hero.page1.option')} />

            <div className="sm:flex gap-5 md:gap-8 lg:gap-10 justify-center">
                <Card text={t('hero.page1.summary')} img={resume} />
                <Card text={t('hero.page1.quiz')} img={quiz} />
            </div>
        </>
    )
}