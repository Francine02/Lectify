import { checkEmailRequest } from '@/service/auth/check-email-request';
import { startTimer } from '../time/start-timer';

type ResendCode = {
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  isSubmitting: boolean;
  email: string;
};

export const resendCode = async ({ setTimer, isSubmitting, email }: ResendCode) => {
  if (!isSubmitting) {
    setTimer(600);
    startTimer(setTimer);

    await checkEmailRequest({ email });
  }
};
