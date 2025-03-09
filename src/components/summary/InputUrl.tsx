import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";

export function InputUrl() {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const onSubmit = () => {
        console.log('foi')
    }

    return (
        <div className="w-full sm:w-96 md:w-[30rem] m-auto mb-4">
            <div className="relative">
                <div className="m-3 p-[0.11rem] rounded-full bg-gradient-to-t from-rosa via-rosa-secundary to-bege">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                        {...register('url', {
                            required: "A URL é obrigatória!",
                            maxLength: {value: 200, message: "Tamanho da URL excedido!"},
                            pattern: {
                                value: /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^&]+)/,
                                message: "Url inválida!"

                            }
                        })}
                        className=" pl-5 pr-20 py-2 w-full rounded-full bg-bg-components focus:outline-none"
                        type="text"
                        id="name"
                        placeholder={t('hero.page2.url')}
                    />
                </div>
                {errors.url &&
                    <div className=" absolute top-12 left-4 text-sm font-bold flex items-center gap-2">
                        <img src="./assets/info.png" alt="Alerta de erro" className="w-4 h-4"/>
                        <p className="text-red-500">
                            {errors?.url.message?.toString()}
                        </p>
                    </div>
                }

                <div className="absolute h-full top-0 right-3 p-0.5 rounded-full bg-gradient-to-t from-[#FF005B] to-[#F2D3AC]">
                    <Button onClick={() => handleSubmit(onSubmit)()} text={t('hero.page2.button')} />
                </div>
            </div>
        </div>
    );
}
