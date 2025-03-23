import { createContext, useState, useContext, useEffect } from "react";

interface QuizContextType {
    data: FormData | null,
    setData: React.Dispatch<React.SetStateAction<FormData | null>>,
    score: number,
    setScore: React.Dispatch<React.SetStateAction<number>>
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<FormData | null>(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const savedData = sessionStorage.getItem("quizData");
        const savedScore = sessionStorage.getItem("quizScore");

        if (savedData) {
            setData(JSON.parse(savedData));
        }
        if (savedScore) {
            setScore(parseInt(savedScore, 10));
        }

    }, []);

    useEffect(() => {
        if (data) {
            sessionStorage.setItem("quizData", JSON.stringify(data));
        } else {
            sessionStorage.removeItem("quizData");
        }

        sessionStorage.setItem("quizScore", score.toString());

    }, [data, score]);

    return (
        <QuizContext.Provider value={{ setData, data, score, setScore }}>
            {children}
        </QuizContext.Provider>
    )
}

export function useQuizContext(): QuizContextType {
    const context = useContext(QuizContext);

    if (context === undefined) throw new Error("Contexto deve ser usado dentro de um QuizProvider")

    return context;
}