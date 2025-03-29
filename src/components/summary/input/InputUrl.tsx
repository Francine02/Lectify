import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "../../button/Button";

export function InputUrl({ onClick, loading }: { onClick: () => void, loading: boolean }) {
    const { t } = useTranslation();
    const { register, formState: {  isValid } } = useFormContext();

    return (
        <div className="max-w-80 sm:max-w-full sm:w-96 md:w-[30rem] m-auto mb-4">
            <div className="relative rounded-xl overflow-x-clip">

                <input
                    {...register('youtube_url', {
                        required: t('errors.type.required'),
                        maxLength: { value: 200, message: t('errors.URL exceeds maximum length') },
                        pattern: {
                            value: /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^&]+)/,
                            message: t('errors.URL invalid')

                        }
                    })}
                    className=" pl-5 pr-24 py-1.5 w-full rounded-xl bg-[#efecec] focus:outline-none"
                    type="text"
                    placeholder={t('hero.page2.url')}
                />

                <div className="absolute top-0.5 right-1 p-[0.1rem]">
                    <Button disabled={!isValid} className="h-7.5 items-center rounded-lg py-1 px-3 text-center text-sm font-bold " onClick={onClick} loading={loading} text={t('hero.page2.button')} />
                </div>
            </div>
        </div>
    );
}
