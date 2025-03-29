import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Feedback } from "../feedback/Feedback";
import { Logo } from "../logos/Logo";
import { Subtitle } from "../text/Subtitle";
import { Links } from "./Links";

export function Footer() {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            { showModal &&
                <Feedback showModal={setShowModal} />
            }
            <footer className="relative w-full mt-10 px-8 sm:px-12 md:px-20 lg:px-24 xl:px-28 2xl:px-36 bg-bg-components before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[0.1rem] before:bg-gradient-to-r before:from-rosa before:via-rosa-secundary before:to-bege">
                <div className="grid sm:grid-cols-3 py-10 space-y-6 justify-center">
                    <Logo />
                    <div>
                        <Subtitle title={t('footer.info')} />
                        <p onClick={() => setShowModal(true)} className="cursor-pointer text-center text-[0.8rem] sm:text-[1rem] font-semibold text-text pt-3 hover:opacity-75">{t('footer.docs')}</p>
                        <Links link="https://github.com/Francine02/Lectify" text={`Frontend ${t('footer.code')}`} />
                        <Links link="https://github.com/id0ubl3g/lectify-flask-api" text={`Backend ${t('footer.code')}`} />
                    </div>

                    <div>
                        <Subtitle title={t('footer.develop')} />
                        <Links link="https://github.com/Francine02" img="/assets/Icon-github.png" text="Francine Cruz" />
                        <Links link="https://www.linkedin.com/in/francine-ccruz" img="/assets/Icon-linkedin.png" text="Francine Cruz" />
                        <Links link="https://github.com/id0ubl3g" img="/assets/Icon-github.png" text="George Victor" />
                        <Links link="https://www.linkedin.com/in/id0ubl3g" img="/assets/Icon-linkedin.png" text="George Victor" />
                    </div>
                </div>
                <p className="text-secondary-phone text-center pb-4 pt-5 border-t border-[#c7c7c7]">© 2025 Lectify. {t('footer.license')}</p>
            </footer>
        </>
    )
}