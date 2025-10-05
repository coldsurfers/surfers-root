export function getCheapestTicketPrice(
  tickets: {
    openDate: string;
    prices: {
      currency: string;
      id: string;
      price: number;
    }[];
    seller: string;
    url: string;
  }[]
) {
  const prices = tickets.flatMap((ticket) => ticket.prices);
  const cheapestPrice =
    prices.length > 0
      ? prices.reduce((min, current) => {
          return current.price < min.price ? current : min;
        }, prices[0])
      : null;

  return cheapestPrice;
}
