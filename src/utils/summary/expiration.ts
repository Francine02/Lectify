/** Retenção: todo resumo vive 7 dias, e as questões dele herdam a mesma data. */
export const RETENTION_DAYS = 7;

export type ExpirationState = 'expired' | 'soon' | 'ok';

export interface Expiration {
  state: ExpirationState;
  /** Dias inteiros restantes (0 = vence hoje). */
  days: number;
  hours: number;
  label: string;
}

export const summaryExpiration = (expiresAt?: string | null): Expiration => {
  if (!expiresAt) return { state: 'ok', days: RETENTION_DAYS, hours: RETENTION_DAYS * 24, label: '' };

  const diff = new Date(expiresAt).getTime() - Date.now();

  if (Number.isNaN(diff))
    return { state: 'ok', days: RETENTION_DAYS, hours: RETENTION_DAYS * 24, label: '' };

  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(hours / 24);

  if (diff <= 0) return { state: 'expired', days: 0, hours: 0, label: 'Expirado' };

  if (hours < 24)
    return {
      state: 'soon',
      days: 0,
      hours,
      label: hours <= 1 ? 'Expira em menos de 1h' : `Expira em ${hours}h`,
    };

  return {
    state: days < 2 ? 'soon' : 'ok',
    days,
    hours,
    label: `Expira em ${days} ${days === 1 ? 'dia' : 'dias'}`,
  };
};
