import { useTranslation } from "react-i18next";
import { Modal } from "../questions/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import emailjs from '@emailjs/browser';
import { Title } from "../home/Title";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import { Error } from "./Error";
import { Loading } from "../quiz/Loading";

export function Feedback({ showModal }: { showModal: Dispatch<SetStateAction<boolean>> }) {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            name: '',
            message: ''
        },
        mode: 'onSubmit'
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const onSubmit = async (data: { name: string; email: string; message: string }) => {
        setStatus('loading');
        const templateParams = {
            from_name: data.name,
            email: data.email,
            reply_to: data.email,
            message: data.message
        };

        try {
            await emailjs.send(
                import.meta.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                import.meta.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
            setStatus('success');
        } catch (error) {
            setStatus('error');
        }
    }


    return (
        <Modal setShowModal={showModal}>
            {status === 'success' ? (
                <div className=" text-center">
                    <img src="./assets/sucesso.png" alt="sucesso" className="w-20 mx-auto" />
                    <p className="text-lg font-semibold text-gray-900">{t('contact.successMessage')}</p>
                </div>
            ) : (
                <>
                    <Title className="text-2xl sm:text-3xl mb-5" emphasis={t('footer.docs')} />

                    <form onSubmit={handleSubmit(onSubmit)} className='flex-col space-y-4 p-2'>
                        <Input
                            errorMessage={errors?.name?.message}
                            errors={!!errors.name}
                            {...register('name', {
                                required: t('errors.type.required'),
                                pattern: {
                                    value: /^([a-zA-Zà-úÀ-Ú]|\s+)+$/,
                                    message: t('errors.type.onlyLetters')
                                }
                            })} type={"text"} placeholder={"Luiz Antonio"} />

                        <Input
                            errorMessage={errors?.email?.message}
                            errors={!!errors.email}
                            {...register('email', {
                                required: t('errors.type.required'),
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: t('errors.type.onlyEmail')
                                }
                            })}
                            type={"text"}
                            placeholder={"luizantonio@gmail.com"} />

                        <div className="relative">
                            <textarea
                                className='w-full px-3 py-2 max-h-64 min-h-20 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
                                {...register('message', {
                                    required: t('errors.type.required')
                                })}>
                            </textarea>
                            {errors.message && <Error text={errors.message.message} />}
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`text-secondary-phone py-1 sm:py-2 w-72 mt-5 sm:w-96 mx-auto text-gray-50 cursor-pointer font-black rounded-lg bg-gradient-to-r from-rosa via-rosa-secundary to-bege hover:opacity-90 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${status === 'loading' && 'opacity-50'}`}>
                            {status === 'loading' ? <Loading /> : t('hero.page5.send')}
                        </button>

                    </form>

                    {status === 'error' && <p className='text-center text-sm text-red-600 py-1 font-bold'>{t('contact.errorMessage')}</p>}

                </>
            )}

        </Modal >
    )
}
