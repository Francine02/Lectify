import { resendCode } from '@/utils/form/resend-code';
import { startTimer } from '@/utils/time/start-timer';
import { useEffect, useState } from 'react';

type ResendCodeType = {
  email: string;
  isSubmitting: boolean;
  initialTime?: number;
};

export function useResendCode({ email, initialTime = 600, isSubmitting }: ResendCodeType) {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    const interval = startTimer(setTimer);
    return () => clearInterval(interval);
  }, []);

  const handleResend = async () => {
    await resendCode({ setTimer, isSubmitting, email });
  };

  return { timer, handleResend };
}
