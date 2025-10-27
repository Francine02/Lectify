import { Logo } from '@/components/Logo';
import { LuPanelLeftClose } from 'react-icons/lu';

export function SidebarHeader() {
  return (
    <header className=" p-4 flex justify-center items-center gap-x-2">
      <Logo />

      <div className="lg:hidden absolute top-1 -end-3">
        <button
          type="button"
          className="cursor-pointer flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
          data-hs-overlay="#hs-sidebar-mini-sidebar"
        >
          <LuPanelLeftClose />
        </button>
      </div>
    </header>
  );
}
