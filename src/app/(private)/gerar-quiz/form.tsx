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
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IconCircle } from '@/components/IconCircle';
import { QuizData, quizSchema } from './quiz-schema';
import { Dropzone } from '@/components/Dropzone';
import { generateQuiz } from '@/service/quiz/generate-quiz';

export function GenerateQuizForm() {
    const methods = useForm<QuizData>({
        resolver: zodResolver(quizSchema),
    });

    const onSubmit: SubmitHandler<QuizData> = async (data) => {
        const response = await generateQuiz(data);

        if (!response.success) {
            toast.error(response.error?.message);
            return;
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="min-h-screen sm:min-h-fit flex flex-col justify-center items-center gap-7 max-w-3xl mx-auto text-center"
            >
                <IconCircle type="quiz" />
                <div className="pb-3">
                    <h1 className="text-title font-black">Gere questões</h1>
                    <p className="subtitle">Envie um arquivo com o conteúdo e comece agora.</p>
                </div>

                <Dropzone />

                <Button isLoading={methods.formState.isSubmitting} type="submit" className="mt-3">
                    Gerar
                </Button>
            </form>
        </FormProvider>
    );
}
