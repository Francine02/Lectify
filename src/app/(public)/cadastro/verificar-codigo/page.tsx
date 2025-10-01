import { cookies } from 'next/headers';
import { CheckCodeForm } from './form';
import { redirect } from 'next/navigation';

async function CheckCode() {
  const cookieStore = await cookies();
  const step = cookieStore.get('step')?.value;

  if (step !== '1') redirect('/cadastro');

  return <CheckCodeForm />;
}

export default CheckCode;
