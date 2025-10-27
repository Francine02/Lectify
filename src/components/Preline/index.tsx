'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Preline UI
async function loadPreline() {
  return import('preline/dist/index.js');
}

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    const initPreline = async () => {
      await loadPreline();
    };

    initPreline();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
        window.HSStaticMethods.autoInit();
      }
    }, 1000);
  }, [path]);

  return null;
}
