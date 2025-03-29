import { Button } from "@/src/components/button/Button";
import { Checkbox } from "@/src/components/checkbox/Checkbox";
import { Error } from "@/src/components/error/Error";
import { LogoPink } from "@/src/components/logos/LogoPink";
import { Dropzone } from "@/src/components/quiz/Dropzone";
import { Subtitle } from "@/src/components/text/Subtitle";
import { Title } from "@/src/components/text/title/Title";
import { useQuizContext } from "@/src/context/QuizContext";
import { translateError } from "@/src/service/errors";
import { quizRequest } from "@/src/service/quizRequest";
import { DataQuiz } from "@/src/types/DataQuiz";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function QuizContent() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { setData } = useQuizContext();
    const methods = useForm<DataQuiz>({
        mode: 'onChange',
        defaultValues: {
            file: null,
            quizPolity: false
        }
    });

    const file = methods.watch("file");
    const isQuizPolityChecked = methods.watch("quizPolity");


    const handleQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        if (file) {
            formData.append("file", file, file.name);
        }

        const result = await quizRequest(formData);
        if (result?.code === 200 && result?.data) {
            setData(result.data);
            router.push('/quiz/questions');
        } else if (result?.error) {
            setError(translateError(result.error, t));
        }

        setLoading(false);
    }
    return (
        <>
            <LogoPink />
            <Title useSparkles title={t('hero.title.test')} emphasis={t('hero.title.testLine')} />
            <Subtitle title={t('hero.page3.file')} />

            <FormProvider {...methods}>

                <Dropzone />
                {(error || methods.formState.errors.file ) && <Error className="flex justify-center mb-5 mt-[-1.5rem] text-center" text={error || methods.formState.errors?.file?.message?.toString()} />}

                <Checkbox name='quizPolity' />

                <div className="flex justify-center mt-5">
                    <Button disabled={!file || !isQuizPolityChecked || !methods.formState.isValid} type="submit" text={t("hero.page3.button")} loading={loading} onClick={handleQuiz} />
                </div>
            </FormProvider >
        </>
    )
}