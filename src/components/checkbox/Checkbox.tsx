import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Error } from "../error/Error";

export function Checkbox({name}: {name:string}) {
    const { t, i18n } = useTranslation();
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <div className="flex items-center justify-center">
                <input
                    {...register(name, {
                        required: t('errors.type.required')
                    })}
                    type="checkbox"
                    className="w-4 h-4 text-rosa bg-gray-100 border-gray-300 rounded-sm accent-rosa focus:ring-rosa focus:ring-2 " />
                <label htmlFor={name} className="ms-2 text-sm font-medium text-gray-900 d">{t('polity.agree')}
                    <a rel="noopener noreferrer"
                        href={i18n.language === 'pt' ? '/privacyPolicy/privacy-policy-pt.pdf' : '/privacyPolicy/privacy-policy-en.pdf'}
                        target="_blank"
                        className="text-rosa  hover:underline">
                        {t('polity.privacy')}
                    </a>
                </label>
            </div>
            {errors[name] && <Error className="flex justify-center pt-1" text={errors[name]?.message?.toString()} />}
        </>
    )
}