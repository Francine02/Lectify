export function ModalMessage({ message }: { message: string }) {
  return (
    <div className="p-4 overflow-y-auto">
      <p className="mt-1 text-gray-800">{message}</p>
    </div>
  );
}
