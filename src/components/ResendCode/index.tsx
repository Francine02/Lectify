import { timeView } from '@/utils/time/time-view';
import { ResendCodeProps } from './ResendCodeProps';

export function ResendCode({ timer, onResend }: ResendCodeProps) {
  return (
    <p className="text-sm pt-2 text-gray-600">
      {timer > 0 ? (
        <>
          Você poderá reenviar o código em:
          <span className="font-bold text-gray-800 pl-1">{timeView(timer)}</span>
        </>
      ) : (
        <button
          type="button"
          className="text-gray-800 hover:underline cursor-pointer"
          onClick={onResend}
        >
          Reenviar código
        </button>
      )}
    </p>
  );
}
