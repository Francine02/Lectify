import { Logo } from '../Logo';
import { Contacts } from './Contacts';
import { Developers } from './Developers';

export function Footer() {
  return (
    <footer className="bg-black text-[#dadada] py-10 px-4 sm:px-10 md:px-20 lg:px-34 w-full">
      <div className="max-w-7xl mx-auto w-full flex flex-wrap justify-between items-center sm:items-start gap-3">
        <Logo />

        <Developers />

        <Contacts />
      </div>

      <div className="max-w-7xl mx-auto mt-10 border-t border-[#7a7a7a] pt-4 text-center text-xs">
        <p>&copy; 2025 Lectify. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
