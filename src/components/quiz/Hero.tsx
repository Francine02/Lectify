import { useTranslation } from "react-i18next";
import { Title } from "../home/Title";
import { SelectOption } from "../home/SelectOption";
import { Logo } from "../home/Logo";
import { Dropzone } from "./Dropzone";
import { Button } from "./Button";
import { useState } from "react";
import { quizRequest } from "@/src/service/quizRequest";
import { useRouter } from "next/navigation";
import { useQuizContext } from "@/src/context/QuizContext";


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
            <Logo />
            <Title title={t('hero.title.test')} emphasis={t('hero.title.testLine')} />
            <SelectOption title={t('hero.page3.file')} />

            <Dropzone onFileChange={setFile} />
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex justify-center">
                <Button text={t("hero.page3.button")} loading={loading} onClick={handleQuiz} />
            </div>
        </>
    )
}