import axios from 'axios';

export async function setStep(step?: number) {
  if (step === undefined) {
    await axios.post('/api/auth/step/reset', {}, { withCredentials: true });
    return;
  }
  await axios.post('/api/auth/step', { step }, { withCredentials: true });
}
