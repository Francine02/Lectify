import { Checkbox } from "@/src/components/checkbox/Checkbox";
import { Error } from "@/src/components/error/Error";
import { LogoPink } from "@/src/components/logos/LogoPink";
import { FileSummary } from "@/src/components/summary/fileSummary/FileSummary";
import { InputUrl } from "@/src/components/summary/input/InputUrl";
import { Radio } from "@/src/components/summary/radio/Radio";
import { Subtitle } from "@/src/components/text/Subtitle";
import { Title } from "@/src/components/text/title/Title";
import { useRequest } from "@/src/hooks/useRequest";
import { summaryRequest } from "@/src/service/summaryRequest";
import { DataSummarize } from "@/src/types/DataSummarize";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function SummaryContent() {
    const { t, i18n } = useTranslation();
    const methods = useForm({
        mode: 'onBlur',
        defaultValues: {
            output_format: 'pdf',
            youtube_url: ''
        }
    });
    const { data, loading, error, makeRequest } = useRequest();
    const watchFormat = methods.watch('output_format');

    const onSubmit = async (data: DataSummarize) => {
        const dataForm = {
            youtube_url: data.youtube_url,
            output_format: data.output_format,
            language_select: i18n.language === 'pt' ? 'pt-BR' : 'en-US'
        }

        await makeRequest(summaryRequest, dataForm);

    }

    return (
        <>
            <LogoPink />
            <Title
                useSparkles
                title={t('hero.title.summary')}
                emphasis={t('hero.title.summaryLine')}
                titleContinuation={i18n.language === 'pt' ? " automático." : ""} />

            {data ? (
                <FileSummary url={data} format={methods.getValues('output_format')} />
            ) : (
                <FormProvider {...methods}>
                    <InputUrl loading={loading} onClick={methods.handleSubmit(onSubmit)} />
                    {(error || methods.formState.errors.youtube_url) && <Error className="flex justify-center mb-5 mt-[-1rem] text-center" text={error || methods.formState.errors?.youtube_url?.message?.toString()} />}

                    <div className="sm:flex space-x-5 justify-center pt-4">
                        <Subtitle title={t('hero.page2.formate')} />
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
                </FormProvider >
            )}
        </>
    )
}