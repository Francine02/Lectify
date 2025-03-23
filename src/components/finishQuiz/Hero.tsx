import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Subtitle } from "../questions/Subtitle";
import { Button } from "../quiz/Button";
import { ConfettiDemo } from "./Confetti";
import { Feedback } from "./Feedback";
import { PointerDemo } from "./Pointer";
import { Score } from "./Score";

export function Hero() {
    const { t } = useTranslation();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const handleBack = () => {
        router.push('/')
        sessionStorage.clear();
    }

    return (
        <section className="text-center bg-bg-components max-w-[35rem] mx-auto p-10 rounded-lg">
            <img src="/assets/congratulations.png" alt="Felicidades icone" className="mx-auto w-20"/>
            <ConfettiDemo />
            <Subtitle title={t('hero.page5.points')} />
            <Score />
            <div className=" pt-10 flex justify-center gap-4">
                <Button secondary onClick={handleBack} text={t('hero.page5.back')} />

                <div>
                    <PointerDemo />
                    <Button onClick={() => setShowModal(true)} text={t('hero.page5.evaluate')} />
                </div>
            </div>
            {showModal && (
                <Feedback showModal={setShowModal} />
            )}
        </section>
    )
}