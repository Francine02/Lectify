import Animated from "@/src/components/animations/Animation";
import { Button } from "@/src/components/button/Button";
import { Modal } from "@/src/components/modal/Modal";
import { PageBlank } from "@/src/components/pageBlank/PageBlank";
import { Option } from "@/src/components/questions/options/Option";
import { ProgressBar } from "@/src/components/questions/progressBar/ProgressBar";
import { Paragraph } from "@/src/components/text/Paragraph";
import { Title } from "@/src/components/text/title/Title";
import { useQuizContext } from "@/src/context/QuizContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function QuestionsContent() {
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

    const handleFinish = () => {
        sessionStorage.removeItem('quizData');
        router.push('/quiz/questions/finish-quiz');
    }

    return (
        <Animated key={count} direction="right">
            {currentQuestion ? (
                <div className="grid">
                    <div className="flex justify-center mb-7">
                        {numbersOfQuestions.map((n) => {
                            return <ProgressBar key={n} number={n} count={count} />
                        })}
                    </div>


                    <Title className="text-3xl sm:text-4xl lg:text-5xl" emphasis={t('hero.page4.title') + " " + count} />
                    <Paragraph title={currentQuestion.pergunta} />
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
                            <img src="/assets/dica.png" className="w-16 mx-auto" alt="dica" />
                            <div className="mt-2">
                                <p className="text-sm font-medium">{currentQuestion.dica}</p>
                            </div>
                        </Modal>
                    )}

                    <div className="flex justify-center gap-10 pt-1">
                        <Button
                            secondary
                            onClick={() =>
                                setShowModal(true)}
                            loading={false}
                            text={t('hero.page4.tip')} />

                        {count === 5 ? (
                            <Button
                                disabled={selected.length === 0}
                                onClick={handleFinish}
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
                <div className="grid justify-center mx-auto">
                    <PageBlank img="/assets/erro.png" text={t('hero.page4.error')} />
                    <Button
                        className="mx-auto px-8 py-1 rounded-lg mt-5"
                        onClick={() => router.push('/quiz')}
                        loading={false}
                        text={t('hero.page5.back')} />
                </div>
            )}

        </Animated>
    )
}