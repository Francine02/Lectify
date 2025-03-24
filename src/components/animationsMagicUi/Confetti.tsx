import { useEffect, useRef } from "react";

import { Confetti, type ConfettiRef } from "../magicui/confetti";
import { Title } from "../text/Title";
import confetti from "canvas-confetti";
import { useTranslation } from "react-i18next";

export function ConfettiDemo() {
  const { t } = useTranslation();
    const confettiRef = useRef<ConfettiRef>(null);
    const ConfettiFire = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
     
        const randomInRange = (min: number, max: number) =>
          Math.random() * (max - min) + min;
     
        const interval = window.setInterval(() => {
          const timeLeft = animationEnd - Date.now();
     
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
     
          const particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);
      }

      useEffect(() => {
        ConfettiFire();
    }, []);

    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg">
            <Title title={t('hero.page5.congratulations') + "!"}/>

            <Confetti
                ref={confettiRef}
                className="absolute left-0 top-0 z-0 size-full"
            />
        </div>
    );
}
