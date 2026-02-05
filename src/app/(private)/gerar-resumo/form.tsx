'use client';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Radio } from '@/components/Radio';
import { SummaryGenerated } from '@/components/SummaryGenerated';
import { SUMMARY_OUTPUT_FORMATS } from '@/constants/form/summary-output-formats';
import { generateSummary } from '@/service/summary/generate-summary';
import { cn } from '@/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
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

  const onSubmit: SubmitHandler<SummaryData> = async (data) => {
    const result = await generateSummary(data);

    if (!result.success) {
      toast.error(result.error?.message);
      return;
    }

    toast.success('Resumo gerado!');
  };

  const hasSummary = true;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7 min-h-screen flex flex-col justify-center sm:min-h-fit"
    >
      <h1 className={cn('text-title font-black pb-3', hasSummary ? 'pl-10 sm:pl-0' : '')}>
        Gere um resumo
      </h1>

      <div className="flex flex-col gap-20 lg:flex-row lg:justify-between">
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
          <Button isLoading={isSubmitting} type="submit" className="sm:w-fit sm:h-8 ">
            Gerar
          </Button>
        </div>
        <SummaryGenerated />
      </div>
    </form>
  );
}
