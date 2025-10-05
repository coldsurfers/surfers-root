export function formatPrice(price: { currency: string; id: string; price: number }) {
  return `${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
  }).format(price.price)}`;
}

export function getCheapestPrice(
  prices: {
    currency: string;
    id: string;
    price: number;
  }[]
) {
  const cheapestPrice =
    prices.length > 0
      ? prices.reduce((min, current) => {
          return current.price < min.price ? current : min;
        }, prices[0])
      : null;

  return cheapestPrice;
}
