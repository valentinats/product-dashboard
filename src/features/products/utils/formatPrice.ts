export function formatPrice(price: number): string {
  const [whole, decimal] = price.toFixed(2).split(".");
  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formattedWhole},${decimal}`;
}
