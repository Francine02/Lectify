'use client';

import { Button } from '@/components/Button';
import { IconCircle } from '@/components/IconCircle';
import { Input } from '@/components/Input';
import { Progress } from '@/components/Progress';
import { Radio } from '@/components/Radio';
import { SummaryGenerated } from '@/components/SummaryGenerated';
import { SUMMARY_OUTPUT_FORMATS } from '@/constants/form/summary-output-formats';
import { checkSummary } from '@/service/summary/check-summary';
import { generateSummary } from '@/service/summary/generate-summary';
import { cn } from '@/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SummaryData, summarySchema } from './summary-schema';

export function GenerateSummaryForm() {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SummaryData>({
        resolver: zodResolver(summarySchema),
        defaultValues: {
            output_format: SUMMARY_OUTPUT_FORMATS[0],
        },
    });
    const watchFormat = watch('output_format');

    const [data, setData] = useState<string>();
    const [progress, setProgress] = useState<string>('0');
    const [isGenereting, setIsGenerating] = useState(false);

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const onSubmit: SubmitHandler<SummaryData> = async (data) => {
        const firstRequest = await generateSummary(data);
        setIsGenerating(true);
        setProgress('10');

        if (!firstRequest.success) {
            toast.error(firstRequest.error?.message);
            return;
        }

        let count = 0;
        let checkResult;

        while (count < 5) {
            await delay(40000);

            const check = await checkSummary(data);

            const progressValue = 10 + ((count + 1) * 80) / 5;

            setProgress(progressValue.toFixed(1));

            if (check.data?.status === 'success') {
                setProgress('90');
                checkResult = true;
                break;
            }

            if (check.error || check.data?.status === 'error') {
                setProgress('0');
                setIsGenerating(false);
                toast.error(check.error?.message ?? 'Ocorreu um erro ao gerar o resumo.');
                setData('');
                break;
            }

            count++;
        }

        if (checkResult) {
            const result = await generateSummary(data);

            if (!result.success || !result.data) {
                toast.error(result.error?.message);
                return;
            }

            const downloadUrl = URL.createObjectURL(result.data);
            setProgress('100');

            if (downloadUrl) {
                await delay(2000);
                setProgress('0');
                setData(downloadUrl);
                toast.success('Resumo gerado!');
                setIsGenerating(false);
            }
        }
    };

    const hasSummary = true;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 min-h-screen flex flex-col justify-center sm:min-h-fit">
            <div className="flex flex-col gap-20 lg:flex-row lg:justify-evenly items-center">
                <div className="space-y-7 w-full">
                    <div className="flex flex-col items-center pb-3">
                        <IconCircle type="summary" />
                        <h1 className={cn('text-title font-black', hasSummary ? 'pl-10 sm:pl-0' : '')}>Gere um resumo</h1>
                        <p className="subtitle">Cole o link do YouTube e escolha o formato do seu resumo.</p>
                    </div>
                    <Input.Root
                        {...register('youtube_url')}
                        errors={!!errors.youtube_url}
                        helperText={errors.youtube_url?.message}
                        label="URL do YouTube"
                        placeholder="https://www.youtube.com/***"
                    />
                    <div className="flex gap-5 pb-3">
                        <Radio
                            {...register('output_format')}
                            checked={watchFormat === SUMMARY_OUTPUT_FORMATS[0]}
                            value={SUMMARY_OUTPUT_FORMATS[0]}
                            onChange={() => setValue('output_format', SUMMARY_OUTPUT_FORMATS[0])}
                            text="PDF"
                        />
                        <Radio
                            {...register('output_format')}
                            checked={watchFormat === SUMMARY_OUTPUT_FORMATS[1]}
                            onChange={() => setValue('output_format', SUMMARY_OUTPUT_FORMATS[1])}
                            value={SUMMARY_OUTPUT_FORMATS[1]}
                            text="Markdown"
                        />
                    </div>
                    <Button isLoading={isSubmitting} disabled={isSubmitting} type="submit">
                        Gerar
                    </Button>
                </div>
                {isGenereting ? <Progress value={progress} /> : <SummaryGenerated hasSummary={!!data} url={data} />}
            </div>
        </form>
    );
}
