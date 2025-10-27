'use client';
interface ModalContainerProps {
  children: React.ReactNode;
  id: string;
}

export function ModalContainer({ children, id }: ModalContainerProps) {
  return (
    <div
      id={`hs-${id}`}
      className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none"
      role="dialog"
      tabIndex={-1}
      aria-labelledby={`hs-${id}-label`}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-xs"></div>

      <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-56px)] flex items-center">
        <div className="w-full flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
