import { IndicatorStrongPassword } from './IndicatorStrongPasword';
import { LevelPassword } from './LevelPassword';
import { RulesPassword } from './RulesPassword';

export const StrongPassword = () => {
  return (
    <>
      <IndicatorStrongPassword />
      <div id="hs-strong-password-hints" className="mb-3">
        <LevelPassword />

        <h4 className="my-2 text-sm font-semibold text-gray-700 ">Sua senha deve ter:</h4>

        <ul className="space-y-1 text-sm text-gray-500 dark:text-neutral-500 grid lg:grid-cols-2">
          <RulesPassword />
        </ul>
      </div>
    </>
  );
};
