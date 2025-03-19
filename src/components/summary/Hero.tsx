import { DataSummarize } from "@/src/types/DataSummarize";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Logo } from "../home/Logo";
import { SelectOption } from "../home/SelectOption";
import { Title } from "../home/Title";
import { InputUrl } from "./InputUrl";
import { Radio } from "./Radio";

export function Hero() {
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const methods = useForm({
        mode: 'onBlur',
        defaultValues: {
            output_format: 'pdf',
            youtube_url: ''
        }
    });

    const watchFormat = methods.watch('output_format');

    const onSubmit = async (data: DataSummarize) => {
        setLoading(true);
        const dataForm = {
            youtube_url: data.youtube_url,
            output_format: data.output_format,
            language_select: i18n.language === 'pt' ? 'pt-BR' : 'en-US'
        }

        // const result = await summaryRequest(dataForm);

        // if (result.error === "200") {
        //     console.log(data)
        //     // router.push('/questions');
        // }
        console.log(dataForm)

        setLoading(false);

    }

    return (
        <FormProvider {...methods}>
            <Logo />
            <Title
                title={t('hero.title.summary')}
                emphasis={t('hero.title.summaryLine')}
                titleContinuation={i18n.language === 'pt' ? " automático." : ""} />

            <InputUrl loading={loading} onClick={methods.handleSubmit(onSubmit)} />

            <div className="sm:flex space-x-5 justify-center pt-4">
                <SelectOption title={t('hero.page2.formate')} />
                <div className="flex justify-center gap-5 ">
                    <Radio
                        {...methods.register('output_format')}
                        checked={watchFormat === 'pdf'}
                        value="pdf"
                        onChange={(e) => methods.setValue("output_format", e.target.value)}
                        text="PDF" />
                    <Radio
                        {...methods.register('output_format')}
                        checked={watchFormat === 'md'}
                        onChange={(e) => methods.setValue("output_format", e.target.value)}
                        value="md"
                        text="Markdown" />
                </div>
            </div>
        </FormProvider>
    )
}