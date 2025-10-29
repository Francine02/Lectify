export function SidebarBody({ children }: { children: React.ReactNode }) {
  return (
    <nav className="h-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 mt-4 m-auto">
      <div className="flex flex-col justify-center items-center gap-y-4 ">{children}</div>
    </nav>
  );
}
