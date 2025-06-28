import { AddFormModal } from '@/ui';
import InputWithLabel from '@/ui/InputWithLabel';
import { Fragment, useCallback, useState } from 'react';
import {
  ConcertTicketPricesDocument,
  type ConcertTicketPricesQuery,
  type ConcertTicketPricesQueryVariables,
  useCreateConcertTicketPriceMutation,
} from 'src/__generated__/graphql';
import { StyledAddPriceModalInner } from './register-ticket-price-info-modal.styled';
import type { AddPriceInfoForm } from './register-ticket-price-info-modal.types';

export const RegisterTicketPriceInfoModal = ({
  visible,
  onClose,
  ticketId,
}: {
  visible: boolean;
  onClose: () => void;
  ticketId: string;
}) => {
  const [addPriceForm, setAddPriceForm] = useState<AddPriceInfoForm[]>([
    {
      name: '',
      price: '',
      currency: '',
    },
  ]);

  const addPriceEmptyForm = useCallback(() => {
    setAddPriceForm((prev) =>
      prev.concat({
        name: '',
        price: '',
        currency: '',
      })
    );
  }, []);

  const [createConcertTicketPrice] = useCreateConcertTicketPriceMutation();

  const onClickSubmitForm = useCallback(async () => {
    const promises = addPriceForm.map(async (form) => {
      await createConcertTicketPrice({
        variables: {
          input: {
            title: form.name,
            price: +form.price,
            ticketId: ticketId,
            priceCurrency: form.currency,
          },
        },
        update: (cache, { data }) => {
          if (data?.createConcertTicketPrice?.__typename !== 'TicketPrice') {
            return;
          }
          const { createConcertTicketPrice } = data;
          const concertTicketPricesCache = cache.readQuery<
            ConcertTicketPricesQuery,
            ConcertTicketPricesQueryVariables
          >({
            query: ConcertTicketPricesDocument,
            variables: {
              ticketId: ticketId,
            },
          });
          if (concertTicketPricesCache?.concertTicketPrices?.__typename === 'TicketPriceList') {
            cache.writeQuery<ConcertTicketPricesQuery, ConcertTicketPricesQueryVariables>({
              query: ConcertTicketPricesDocument,
              variables: {
                ticketId,
              },
              data: {
                ...concertTicketPricesCache,
                concertTicketPrices: {
                  ...concertTicketPricesCache.concertTicketPrices,
                  list: concertTicketPricesCache.concertTicketPrices.list?.concat({
                    ...createConcertTicketPrice,
                  }),
                },
              },
            });
          }
        },
      });
    });
    await Promise.all(promises);
    onClose();
  }, [addPriceForm, createConcertTicketPrice, onClose, ticketId]);

  return (
    <AddFormModal
      title={'티켓 가격 정보'}
      visible={visible}
      onClose={onClose}
      onClickTopAddButton={addPriceEmptyForm}
      formListComponent={
        <Fragment>
          {addPriceForm.map((price, priceIndex) => {
            return (
              <StyledAddPriceModalInner key={price.name}>
                <InputWithLabel
                  value={price.name}
                  onChangeText={(text) => {
                    setAddPriceForm((prev) =>
                      prev.map((prevItem, prevIndex) => {
                        if (prevIndex === priceIndex) {
                          return {
                            ...prevItem,
                            name: text,
                          };
                        }
                        return prevItem;
                      })
                    );
                  }}
                  label="가격 종류"
                  placeholder="가격 종류"
                />
                <InputWithLabel
                  value={price.price}
                  onChangeText={(text) => {
                    setAddPriceForm((prev) =>
                      prev.map((prevItem, prevIndex) => {
                        if (prevIndex === priceIndex) {
                          return {
                            ...prevItem,
                            price: text,
                          };
                        }
                        return prevItem;
                      })
                    );
                  }}
                  label="가격"
                  placeholder="가격"
                />
                <InputWithLabel
                  value={price.currency}
                  onChangeText={(text) => {
                    setAddPriceForm((prev) =>
                      prev.map((prevItem, prevIndex) => {
                        if (prevIndex === priceIndex) {
                          return {
                            ...prevItem,
                            currency: text,
                          };
                        }
                        return prevItem;
                      })
                    );
                  }}
                  label="화폐단위"
                  placeholder="화폐단위"
                />
              </StyledAddPriceModalInner>
            );
          })}
        </Fragment>
      }
      onClickSubmitForm={onClickSubmitForm}
    />
  );
};
