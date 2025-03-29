import { useState } from "react";
import { Feedback } from "../feedback/Feedback";
import { PointerDemo } from "../animationsMagicUi/Pointer";
import { Button } from "../button/Button";
import { useTranslation } from "react-i18next";

export function ButtonFeedback() {
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();

    return (
        <>
            <div className="flex justify-center">
                <PointerDemo />
                <Button onClick={() => setShowModal(true)} text={t('hero.page5.evaluate')} />
            </div>
            {showModal && (
                <Feedback showModal={setShowModal} />
            )}
        </>
    )
}