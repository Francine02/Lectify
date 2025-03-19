import { useQuizContext } from "@/src/context/QuizContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Title } from "../home/Title";
import { Button } from "../quiz/Button";
import { Modal } from "./Modal";
import { Option } from "./Option";
import { ProgressBar } from "./ProgressBar";
import { Subtitle } from "./Subtitle";
import { useRouter } from "next/navigation";

export function Hero() {
    const { t } = useTranslation();
    const { data, setScore } = useQuizContext();
    const [count, setCount] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState('');
    const router = useRouter();

    const numbersOfQuestions = [1, 2, 3, 4, 5]

    const handleNextQuestion = () => {
        if (count < Object.keys(data!).length) {
            setCount(count + 1);
        }
        setSelected('')
    }

    const currentQuestion = data && Object.values(data)[count - 1]

    const handleClick = (alternative: string) => {
        setSelected(alternative);

        if (alternative === currentQuestion.resposta_correta) {
            setScore((prev) => prev + 1);
        }
    }

    return (
        <>
            {currentQuestion ? (
                <div className="grid">
                    <div className="flex justify-center mb-7">
                        {numbersOfQuestions.map((n) => {
                            return <ProgressBar key={n} number={n} count={count} />
                        })}
                    </div>


                    <Title emphasis={t('hero.page4.title') + " " + count} />
                    <Subtitle title={currentQuestion.pergunta} />
                    {currentQuestion.alternativas.map((a: string, index: any) => {
                        return <Option
                            response={currentQuestion.resposta_correta}
                            selected={selected}
                            onClick={() => handleClick(a)}
                            key={index}
                            alternative={a}
                            justification={currentQuestion.justificativa} />

                    })}

                    {showModal && (
                        <Modal
                            setShowModal={setShowModal}>
                            <img src="./assets/dica.png" className="w-16 mx-auto" alt="dica" />
                            <div className="mt-2">
                                <p className="text-sm font-medium">{currentQuestion.dica}</p>
                            </div>
                        </Modal>
                    )}

                    <div className="flex justify-center gap-10">
                        <Button
                            onClick={() =>
                                setShowModal(true)}
                            loading={false}
                            text={t('hero.page4.tip')} />

                        {count === 5 ? (
                            <Button
                                disabled={selected.length === 0}
                                onClick={() => router.push('/finishQuiz')}
                                loading={false}
                                text={t('hero.page4.finish')} />
                        ) : (
                            <Button
                                disabled={selected.length === 0}
                                data-dialog-target="modal"
                                onClick={handleNextQuestion}
                                loading={false}
                                text={t('hero.page4.next')} />
                        )}
                    </div>
                </div>
            ) : (
                <div className="grid justify-center">
                    <img
                        className="mx-auto"
                        src="./assets/erro.png"
                        alt="Erro" />
                    <h1 className="font-semibold text-center text-lg">{t('hero.page4.error')}</h1>
                    <Button
                        onClick={() => router.push('/quiz')}
                        loading={false}
                        text={t('hero.page4.back')} />
                </div>
            )}

        </>
    )
}