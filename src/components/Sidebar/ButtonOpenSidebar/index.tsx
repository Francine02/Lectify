import { FaHamburger } from 'react-icons/fa';

export function ButtonOpenSidebar() {
  return (
    <button
      className="absolute top-5 left-4 sm:left-10 lg:hidden hover:opacity-85 cursor-pointer"
      type="button"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="hs-sidebar-mini-sidebar"
      aria-label="Toggle navigation"
      data-hs-overlay="#hs-sidebar-mini-sidebar"
    >
      <FaHamburger className="text-purple-700 size-6" />
    </button>
  );
}
