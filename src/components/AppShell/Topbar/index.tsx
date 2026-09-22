'use client';

import { SIDEBAR_ITEMS_BODY } from '@/constants/sidebar/sidebar-items-body';
import { PROFILE_UPDATED_EVENT } from '@/constants/storage/storage-keys';
import { useTour } from '@/contexts/Tour';
import { getInformationItem } from '@/utils/informations/get-informations';
import { HelpCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const DEFAULT_AVATAR = '/assets/avatar.png';

const TITLES: Record<string, string> = {
  '/minha-conta': 'Meu perfil',
  '/caderno': 'Caderno',
};

/** Barra superior do app: onde estou, e a ação principal sempre à mão. */
export function Topbar() {
  const path = usePathname();
  const { open } = useTour();
  const [image, setImage] = useState(DEFAULT_AVATAR);

  useEffect(() => {
    const read = () => setImage(String(getInformationItem('image_profile')) || DEFAULT_AVATAR);

    read();

    window.addEventListener(PROFILE_UPDATED_EVENT, read);
    return () => window.removeEventListener(PROFILE_UPDATED_EVENT, read);
  }, []);

  const current =
    SIDEBAR_ITEMS_BODY.find((item) => (item.link === '/' ? path === '/' : path.startsWith(item.link)))
      ?.name ?? TITLES[path] ?? 'Lectify';

  return (
    <header className="sticky top-0 z-30 -mx-4 mb-5 flex items-center justify-between gap-3 border-b border-line bg-canvas/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <img src="/assets/logo.png" alt="" className="size-7 shrink-0 lg:hidden" />
        <h2 className="truncate font-display text-base font-extrabold tracking-tight">{current}</h2>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => open()}
          aria-label="Como funciona o Lectify"
          title="Como funciona o Lectify"
          className="focus-ring rounded-xl border border-line bg-surface p-2 text-subtle transition-colors hover:text-purple-700"
        >
          <HelpCircle size={16} />
        </button>

        {path !== '/gerar-resumo' && (
          <Link
            href="/gerar-resumo"
            className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">Novo resumo</span>
          </Link>
        )}

        <Link
          href="/minha-conta"
          aria-label="Minha conta"
          className="focus-ring rounded-full transition-opacity hover:opacity-80"
        >
          <img src={image} alt="" className="size-8 rounded-full border border-line object-cover" />
        </Link>
      </div>
    </header>
  );
}
