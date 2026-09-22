import { AppearanceCard } from '@/components/MyAccount/AppearanceCard';
import { ProfileHeader } from '@/components/MyAccount/ProfileHeader';
import { SubscriptionCard } from '@/components/MyAccount/SubscriptionCard';
import { UsagePanel } from '@/components/Usage/UsagePanel';
import { Metadata } from 'next';
import { MyAccountForm } from './form';

export const metadata: Metadata = {
  title: 'Meu perfil',
  description: 'Acesse sua conta para alterar as informações de perfil.',
  robots: { index: false, follow: false },
};

export default function MyAccount() {
  return (
    <div className="space-y-4">
      <ProfileHeader />

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <SubscriptionCard />
        <UsagePanel />
      </div>

      <AppearanceCard />

      <MyAccountForm />
    </div>
  );
}
