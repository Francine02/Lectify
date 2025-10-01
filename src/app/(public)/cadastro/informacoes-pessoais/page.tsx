import { redirect } from 'next/navigation';
import { PersonalInformationForm } from './form';
import { cookies } from 'next/headers';

async function PersonalInformation() {
  const cookieStore = await cookies();
  const step = cookieStore.get('step')?.value;

  if (step !== '2') redirect('/cadastro/verificar-codigo');
  return <PersonalInformationForm />;
}

export default PersonalInformation;
