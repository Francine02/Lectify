import { useQuizContext } from "@/src/context/QuizContext";
import { AnimatedCircularProgressBar } from "../magicui/animated-circular-progress-bar";

export function Score() {
    const { score } = useQuizContext();

    return (
        <AnimatedCircularProgressBar
            max={5}
            min={0}
            value={score}
            gaugePrimaryColor="#ff0059b8"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
            className="m-auto"
        />
    );
}