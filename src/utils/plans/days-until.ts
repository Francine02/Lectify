export const daysUntil = (date?: string | null) => {
  if (!date) return null;

  const target = new Date(date);

  if (Number.isNaN(target.getTime())) return null;

  const diff = target.getTime() - Date.now();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
