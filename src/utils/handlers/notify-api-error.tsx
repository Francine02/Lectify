'use client';

import { DEFAULT_API_ERROR } from '@/constants/errors/api-errors';
import { toast } from 'react-toastify';

/** Mensagens que merecem um caminho de saída, não só o aviso. */
const QUOTA_PATTERN = /cota (semanal|mensal)|plano não inclui|escolha um plano/i;
const BLOCK_PATTERN = /bloquead/i;

/**
 * Erro de API com contexto: estouro de cota e bloqueio antiabuso ganham um
 * convite ao upgrade e mais tempo em tela, porque exigem uma decisão.
 */
export const notifyApiError = (message?: string) => {
  const text = message ?? DEFAULT_API_ERROR;

  if (QUOTA_PATTERN.test(text)) {
    toast.error(
      <span className="block space-y-1.5">
        <span className="block">{text}</span>
        <a href="/planos" className="block font-bold underline underline-offset-2">
          Ver planos →
        </a>
      </span>,
      { autoClose: 12_000 }
    );
    return;
  }

  toast.error(text, { autoClose: BLOCK_PATTERN.test(text) ? 12_000 : 6_000 });
};
