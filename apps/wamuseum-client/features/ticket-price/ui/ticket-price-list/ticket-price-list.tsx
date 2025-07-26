import { useMemo } from 'react';
import { useConcertTicketPricesQuery } from 'src/__generated__/graphql';
import { TicketPriceListItem } from '../ticket-price-list-item';

export const TicketPriceList = ({ ticketId }: { ticketId: string }) => {
  const { data: ticketPricesData } = useConcertTicketPricesQuery({
    variables: {
      ticketId,
    },
  });
  const ticketPrices = useMemo(() => {
    if (ticketPricesData?.concertTicketPrices?.__typename === 'TicketPriceList') {
      return ticketPricesData.concertTicketPrices.list ?? [];
    }
    return [];
  }, [ticketPricesData]);
  return (
    <>
      {ticketPrices.map((item) => {
        if (!item) {
          return null;
        }
        return <TicketPriceListItem key={item.id} item={item} ticketId={ticketId} />;
      })}
    </>
  );
};
