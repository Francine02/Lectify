import { Button } from '@/components/button';
import { Input } from '@/components/Input';

function Cadastrar() {
  return (
    <>
      <p className="mb-10 text-sm text-center text-gray-500">
        Insira suas informações para terminar o cadastro.
      </p>

      <Input.Root label="Nome de usuário" placeholder="exemplo12" />
      <Input.Password label="Senha" placeholder="*****" />

      <div className="grid grid-cols-2 gap-5">
        <Input.Root label="Nome" placeholder="Mariana" />
        <Input.Root label="Sobrenome" placeholder="Oliveira" />
      </div>

      <Button className="mt-10 md:mt-12 mb-4">Cadastrar</Button>
    </>
  );
}

export default Cadastrar;
