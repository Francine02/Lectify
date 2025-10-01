import { Dispatch, SetStateAction } from 'react';

export const startTimer = (setTimer: Dispatch<SetStateAction<number>>) => {
  const interval = setInterval(() => {
    setTimer((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return interval;
};
