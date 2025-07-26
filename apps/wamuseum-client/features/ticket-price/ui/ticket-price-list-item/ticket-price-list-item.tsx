import { formatCurrency } from '@/utils/format-currency';
import { Button, Modal, Text } from '@coldsurfers/ocean-road';
import { useCallback, useState } from 'react';
import {
  ConcertTicketPricesDocument,
  type ConcertTicketPricesQuery,
  type ConcertTicketPricesQueryVariables,
  type TicketPrice,
  useRemoveConcertTicketPriceMutation,
} from 'src/__generated__/graphql';
import {
  StyledTicketPriceItemContainer,
  StyledTicketPriceItemPrice,
  StyledTicketPriceItemTitle,
} from './ticket-price-list-item.styled';

export const TicketPriceListItem = ({
  item,
  ticketId,
}: { item: TicketPrice; ticketId: string }) => {
  const [deleteTicketPrice] = useRemoveConcertTicketPriceMutation();
  const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);

  const onClickDelete = useCallback(() => {
    deleteTicketPrice({
      variables: {
        input: {
          ticketPriceId: item.id,
        },
      },
      update: (cache, { data }) => {
        if (data?.removeConcertTicketPrice?.__typename === 'TicketPrice') {
          const { id: deletedTicketPriceId } = data.removeConcertTicketPrice;
          const cacheData = cache.readQuery<
            ConcertTicketPricesQuery,
            ConcertTicketPricesQueryVariables
          >({
            query: ConcertTicketPricesDocument,
            variables: {
              ticketId,
            },
          });
          if (!cacheData) {
            return;
          }
          if (cacheData.concertTicketPrices?.__typename === 'TicketPriceList') {
            cache.writeQuery<ConcertTicketPricesQuery, ConcertTicketPricesQueryVariables>({
              query: ConcertTicketPricesDocument,
              variables: {
                ticketId,
              },
              data: {
                ...cacheData,
                concertTicketPrices: {
                  ...cacheData.concertTicketPrices,
                  __typename: 'TicketPriceList',
                  list: cacheData.concertTicketPrices.list
                    ? cacheData.concertTicketPrices.list.filter(
                        (price) => price?.id !== deletedTicketPriceId
                      )
                    : [],
                },
              },
            });
          }
        }
      },
    });
  }, [deleteTicketPrice, item.id, ticketId]);

  return (
    <>
      <StyledTicketPriceItemContainer>
        <StyledTicketPriceItemTitle as="h4">{item.title}</StyledTicketPriceItemTitle>
        <StyledTicketPriceItemPrice>
          {formatCurrency(item.price, item.priceCurrency)}
        </StyledTicketPriceItemPrice>
        <Button
          theme={'transparent'}
          onClick={() => setDeleteConfirmModalVisible(true)}
          style={{ marginLeft: 'auto' }}
        >
          ❌
        </Button>
      </StyledTicketPriceItemContainer>
      <Modal
        visible={deleteConfirmModalVisible}
        onClose={() => setDeleteConfirmModalVisible(false)}
      >
        <Text>확인을 누르면 해당 티켓 가격정보가 삭제돼요.</Text>
        <Button onClick={onClickDelete}>확인</Button>
      </Modal>
    </>
  );
};
