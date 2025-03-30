import { ConfettiDemo } from "@/src/components/animationsMagicUi/Confetti";
import { Score } from "@/src/components/animationsMagicUi/Score";
import { Button } from "@/src/components/button/Button";
import { ButtonFeedback } from "@/src/components/buttonFeedback/ButtonFeedback";
import { Subtitle } from "@/src/components/text/Subtitle";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export function FinishQuizContent() {
    const { t } = useTranslation();
    const router = useRouter();

    const handleBack = () => {
        router.push('/')
        sessionStorage.clear();
    }

    return (
        <section className="text-center bg-bg-components max-w-[40rem] mx-auto p-10 rounded-lg">
            <img src="/assets/congratulations.png" alt="Felicidades icone" className="mx-auto w-20"/>
            <ConfettiDemo />
            <Subtitle title={t('hero.page5.points')} />
            <Score />
            <div className=" pt-10 flex justify-center gap-4">
                <Button secondary onClick={handleBack} text={t('hero.page5.back')} />

                <ButtonFeedback />
            </div>
        </section>
    )
}