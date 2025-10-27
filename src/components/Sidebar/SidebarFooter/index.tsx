export function SidebarFooter({ children }: { children: React.ReactNode }) {
  return (
    <footer className="m-auto pb-4 relative">
      <div className="flex flex-col justify-center items-center gap-y-4">{children}</div>
    </footer>
  );
}
