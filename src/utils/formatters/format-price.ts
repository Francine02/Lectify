export const formatPrice = (price: number) =>
  price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
