import { Sidebar } from '@/components/Sidebar';
import { ButtonOpenSidebar } from '@/components/Sidebar/ButtonOpenSidebar';
import { Toast } from '@/components/Toast';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full sm:px-10 mx-auto sm:py-12 bg-gray-100 min-h-screen ">
      <ButtonOpenSidebar />
      <Sidebar />
      <section className="bg-white rounded-lg w-full px-4 py-4 sm:p-6 md:max-w-5xl lg:max-w-10/12 2xl:max-w-7xl sm:m-auto">
        <Toast />
        {children}
      </section>
    </main>
  );
}
