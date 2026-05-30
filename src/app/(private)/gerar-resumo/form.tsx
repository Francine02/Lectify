'use client';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Radio } from '@/components/Radio';
import { SummaryGenerated } from '@/components/SummaryGenerated';
import { SUMMARY_OUTPUT_FORMATS } from '@/constants/form/summary-output-formats';
import { generateSummary } from '@/service/summary/generate-summary';
import { cn } from '@/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SummaryData, summarySchema } from './summary-schema';
import { IconCircle } from '@/components/IconCircle';
import { checkSummary } from '@/service/summary/check-summary';
import { Progress } from '@/components/Progress';

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

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const onSubmit: SubmitHandler<SummaryData> = async (data) => {
        const firstRequest = await generateSummary(data);
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

            if (check.error) {
                setProgress('0');
                toast.error(firstRequest.error?.message);
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

            if (downloadUrl) {
                setProgress('100');

                await delay(1000);
                setData(downloadUrl);
                toast.success('Resumo gerado!');
            }
        }
    };

    const hasSummary = true;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 min-h-screen flex flex-col justify-center sm:min-h-fit">
            <IconCircle type="summary" />
            <h1 className={cn('text-title font-black pb-3', hasSummary ? 'pl-10 sm:pl-0' : '')}>Gere um resumo</h1>

            <div className="flex flex-col gap-20 lg:flex-row lg:justify-evenly ">
                <div className="space-y-7 w-full">
                    <Input.Root
                        {...register('youtube_url')}
                        errors={!!errors.youtube_url}
                        helperText={errors.youtube_url?.message}
                        label="URL do YouTube"
                        placeholder="https://www.youtube.com/***"
                        className="lg:max-w-lg"
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
                    <Button disabled={isSubmitting} type="submit" className="sm:w-fit sm:h-8 ">
                        Gerar
                    </Button>
                </div>
                {isSubmitting ? <Progress value={progress} /> : <SummaryGenerated hasSummary={!!data} url={data} />}
            </div>
        </form>
    );
}
