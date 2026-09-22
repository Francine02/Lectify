'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Preline só é usado pelos modais. Carregamos depois do primeiro paint para não
 * competir com a navegação, e reinicializamos assim que a rota muda.
 */
export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      await import('preline/dist/index.js');

      if (cancelled) return;

      window.HSStaticMethods?.autoInit?.();
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => init())
      : window.setTimeout(init, 200);

    return () => {
      cancelled = true;

      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, [path]);

  return null;
}
