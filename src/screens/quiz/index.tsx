import { Button } from "@/src/components/button/Button";
import { LogoPink } from "@/src/components/logos/LogoPink";
import { Dropzone } from "@/src/components/quiz/Dropzone";
import { Subtitle } from "@/src/components/text/Subtitle";
import { Title } from "@/src/components/text/title/Title";
import { useQuizContext } from "@/src/context/QuizContext";
import { quizRequest } from "@/src/service/quizRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Hero() {
    const { t } = useTranslation();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { setData } = useQuizContext()

    const handleQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        if (file) {
            formData.append("file", file, file.name);
        }

        const result = await quizRequest(formData);

        if (result.code === 200) {
            setData(result.data);
            router.push('/questions');
        }
        setLoading(false);
    }
    return (
        <>
            <LogoPink />
            <Title useSparkles title={t('hero.title.test')} emphasis={t('hero.title.testLine')} />
            <Subtitle title={t('hero.page3.file')} />

            <Dropzone onFileChange={setFile} />
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex justify-center">
                <Button text={t("hero.page3.button")} loading={loading} onClick={handleQuiz} />
            </div>
        </>
    )
}