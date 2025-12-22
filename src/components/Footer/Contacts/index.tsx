import { CONTACTS } from '@/constants/footer/contacts';

export function Contacts() {
  return (
    <nav aria-label="Contatos">
      <h3 className="text-normal sm:text-lg font-semibold">Contatos</h3>
      <ul className="mt-2 text-xs sm:text-sm gap-2 sm:space-x-3 grid grid-cols-2">
        {CONTACTS.map((contact) => {
          const Icon = contact.icon;
          return (
            <li key={contact.link}>
              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-2"
              >
                <Icon className="text-lg" /> {contact.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
