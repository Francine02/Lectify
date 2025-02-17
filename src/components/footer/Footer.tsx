import { useTranslation } from "react-i18next";
import { Logo } from "../header/Logo";
import { SelectOption } from "../hero/SelectOption";
import { Links } from "./Links";
import github from "../../assets/Icon-github.png";
import linkedin from "../../assets/Icon-linkedin.png";

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="relative w-full mt-36 2xl:mt-52 px-8 sm:px-12 md:px-20 lg:px-24 xl:px-28 2xl:px-36 bg-bg-components before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[0.1rem] before:bg-gradient-to-r before:from-rosa before:via-rosa-secundary before:to-bege">
            <div className="grid sm:grid-cols-3 py-10 space-y-6 justify-center">
                <Logo />
                <div>
                    <SelectOption title={t('footer.info')} />
                    <Links text={t('footer.docs')} />
                    <Links link="https://github.com/id0ubl3g/lectify-flask-api" text={`Frontend ${t('footer.code')}`} />
                    <Links link="https://github.com/Francine02/Lectify" text={`Backend ${t('footer.code')}`} />
                </div>

                <div>
                    <SelectOption title={t('footer.develop')} />
                    <Links link="https://github.com/id0ubl3g" img={github} text="George Victor" />
                    <Links link="https://www.linkedin.com/in/id0ubl3g" img={linkedin} text="George Victor" />
                    <Links link="https://github.com/Francine02" img={github} text="Francine Cruz" />
                    <Links link="https://www.linkedin.com/in/francine-ccruz" img={linkedin} text="Francine Cruz" />
                </div>
            </div>
            <p className="text-secondary-phone text-center pb-4 pt-5 border-t border-[#c7c7c7]">© 2025 Lectify. {t('footer.license')}</p>
        </footer>
    )
}