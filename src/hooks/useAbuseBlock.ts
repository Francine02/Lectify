'use client';

import { blockRemaining } from '@/utils/form/rate-guard';
import { useEffect, useState } from 'react';

/**
 * Enquanto o backend mantém a conta bloqueada por excesso de tentativas, as
 * ações de geração ficam desabilitadas com o tempo restante à vista — insistir
 * só renova o bloqueio.
 */
export function useAbuseBlock() {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const read = () => setRemaining(blockRemaining());

    read();

    const interval = setInterval(read, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.ceil(remaining / 60);

  return {
    isBlocked: remaining > 0,
    remaining,
    label: remaining > 0 ? `Bloqueado por mais ${minutes} min` : '',
  };
}
