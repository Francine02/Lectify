import { PASSWORD_STRONG_RULES } from '@/constants/form/password-strong-rules';
import { FaCheck } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';

export function RulesPassword() {
  return (
    <>
      {PASSWORD_STRONG_RULES.map((password) => (
        <li
          key={password.rules}
          data-hs-strong-password-hints-rule-text={password.rules}
          className="hs-strong-password-active:text-teal-500 flex items-center gap-x-1.5"
        >
          <span className="hidden" data-check="">
            <FaCheck />
          </span>
          <span data-uncheck="">
            <RiCloseLine />
          </span>
          {password.message}
        </li>
      ))}
    </>
  );
}
