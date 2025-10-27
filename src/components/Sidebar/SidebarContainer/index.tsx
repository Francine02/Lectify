export function SidebarContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="hs-sidebar-mini-sidebar"
      className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-20 hs-overlay-open:translate-x-0-translate-x-full transition-all duration-300 transform h-full hidden fixed top-0 start-0 bottom-0 z-60 bg-purple-700 border-e border-gray-200"
      role="dialog"
      tabIndex={-1}
      aria-label="Sidebar"
    >
      <div className="relative flex flex-col h-full max-h-full ">{children}</div>
    </div>
  );
}
