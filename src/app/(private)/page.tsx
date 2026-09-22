import { FeatureGrid } from '@/components/Home/FeatureGrid';
import { HomeHero } from '@/components/Home/Hero';
import { HowItWorks } from '@/components/Home/HowItWorks';
import { PlanCallout } from '@/components/Home/PlanCallout';
import { QuickActions } from '@/components/Home/QuickActions';
import { RecentSummaries } from '@/components/Home/RecentSummaries';
import { TourCard } from '@/components/Home/TourCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Início',
  description: 'Comece a transformar vídeos e documentos em material de estudo.',
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <div className="space-y-8 pb-4">
      <HomeHero />
      <QuickActions />
      <TourCard />
      <RecentSummaries />
      <HowItWorks />
      <FeatureGrid />
      <PlanCallout />
    </div>
  );
}
