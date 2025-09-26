export function LevelPassword() {
  return (
    <div>
      <span className="text-sm text-gray-800 ">Nível: </span>
      <span
        data-hs-strong-password-hints-weakness-text='["Vazio", "Fraca", "Média", "Forte", "Bem forte", "Super Forte"]'
        className="text-sm font-semibold text-gray-800 "
      ></span>
    </div>
  );
}
