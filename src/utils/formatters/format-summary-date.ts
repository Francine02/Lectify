/** summary_at chega do backend como string de data (ex.: "Thu, 23 Oct 2025 04:42:14 GMT"). */
export const formatSummaryDate = (date?: string | null) => {
  if (!date) return '-';

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
