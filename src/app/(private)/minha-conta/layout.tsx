import { AccountHeader } from '@/components/MyAccount/AccountHeader';
import { UploadImage } from '@/components/UploadImage';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <h1 className="text-title font-semibold border-b border-gray-200 w-full mb-2 pl-10 sm:pl-0">
        Meu perfil
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5">
        <div className="flex-col mx-auto text-center">
          <AccountHeader />

          <UploadImage />
        </div>
        {children}
      </div>
    </div>
  );
}
