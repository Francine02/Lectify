export function IndicatorStrongPassword() {
  return (
    <div
      id="hs-strong-password"
      data-hs-strong-password='{
            "target": "#hs-strong-password-with-indicator-and-hint",
            "hints": "#hs-strong-password-hints",
            "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-purple-700 opacity-50 mx-1",
            "minLength": "8"
          }'
      className="flex mt-2 -mx-1"
    ></div>
  );
}
