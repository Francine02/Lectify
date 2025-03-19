import { useTranslation } from "react-i18next";
import { Subtitle } from "../questions/Subtitle";
import { ConfettiDemo } from "./Confetti";
import { Score } from "./Score";

export function Hero() {
    const { t } = useTranslation();

    return (
        <section className="text-center">
            <ConfettiDemo />
            <Subtitle title={t('hero.page5.points')} />
            <Score/>
        </section>
    )
}