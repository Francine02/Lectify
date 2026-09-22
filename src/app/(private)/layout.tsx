import { Topbar } from '@/components/AppShell/Topbar';
import { Dock } from '@/components/Dock';
import { RenewalReminder } from '@/components/Plans/RenewalReminder';
import { ProfileSync } from '@/components/ProfileSync';
import { Sidebar } from '@/components/Sidebar';
import { MobileNav } from '@/components/Sidebar/MobileNav';
import { Toast } from '@/components/Toast';
import { TourDialog } from '@/components/Tour/TourDialog';
import { PomodoroProvider } from '@/contexts/Pomodoro';
import { StudyQueueProvider } from '@/contexts/StudyQueue';
import { SummaryJobProvider } from '@/contexts/SummaryJob';
import { ToolsProvider } from '@/contexts/Tools';
import { TourProvider } from '@/contexts/Tour';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TourProvider>
      <PomodoroProvider>
        <ToolsProvider>
          <SummaryJobProvider>
            <StudyQueueProvider>
              <div className="min-h-dvh bg-canvas lg:pl-[96px]">
                <Sidebar />

                <div className="mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6 lg:pb-12">
                  <Topbar />

                  <Toast />
                  <ProfileSync />
                  <RenewalReminder />

                  {children}
                </div>

                <MobileNav />
                <Dock />
                <TourDialog />
              </div>
            </StudyQueueProvider>
          </SummaryJobProvider>
        </ToolsProvider>
      </PomodoroProvider>
    </TourProvider>
  );
}
