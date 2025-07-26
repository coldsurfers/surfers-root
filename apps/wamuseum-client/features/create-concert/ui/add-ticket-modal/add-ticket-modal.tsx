import { AddFormModal } from '@/ui';
import InputWithLabel from '@/ui/InputWithLabel';
import { Button } from '@coldsurfers/ocean-road';
import { isValid } from 'date-fns';
import { Fragment, useCallback, useEffect, useState } from 'react';
import {
  ConcertTicketsDocument,
  type ConcertTicketsQuery,
  type ConcertTicketsQueryVariables,
  useCreateConcertTicketMutation,
} from 'src/__generated__/graphql';
import { parseDate } from '../add-tickets-ui/add-tickets-ui.utils';
import { StyledAddTicketModalInner } from './add-ticket-modal.styled';
import type { AddTicketForm } from './add-ticket-modal.types';

export const AddTicketModal = ({
  visible,
  onClose,
  concertId,
}: {
  visible: boolean;
  onClose: () => void;
  concertId: string;
}) => {
  const [addTicketsForm, setAddTicketsForm] = useState<AddTicketForm[]>([
    {
      name: '',
      website: '',
      opendate: '',
    },
  ]);
  const [mutateCreateConcertTicket, { loading: loadingCreateConcertTicket }] =
    useCreateConcertTicketMutation({});

  const addTicketEmptyForm = useCallback(() => {
    setAddTicketsForm((prev) =>
      prev.concat({
        name: '',
        website: '',
        opendate: '',
      })
    );
  }, []);

  const removeTicketInput = useCallback((index: number) => {
    setAddTicketsForm((prev) => prev.filter((_, prevIndex) => prevIndex !== index));
  }, []);

  const onClickBulkAdd = useCallback(async () => {
    if (loadingCreateConcertTicket) {
      return;
    }
    const shouldOpenAlert = addTicketsForm.some((ticket) => {
      const isValidOpenDate = isValid(parseDate(ticket.opendate));
      return !isValidOpenDate;
    });
    if (shouldOpenAlert) {
      alert('Invalid Ticket Open Date');
      return;
    }
    const promises = addTicketsForm.map(async (ticket, ticketIndex) => {
      return mutateCreateConcertTicket({
        variables: {
          input: {
            concertId,
            openDate: parseDate(ticket.opendate).toISOString(),
            seller: ticket.name,
            sellingURL: ticket.website,
          },
        },
        onCompleted: () => {
          removeTicketInput(ticketIndex);
        },
        update: (cache, { data }) => {
          if (data?.createConcertTicket?.__typename !== 'Ticket') {
            return;
          }
          const { createConcertTicket: addedConcertTicketData } = data;
          const concertTicketsCache = cache.readQuery<
            ConcertTicketsQuery,
            ConcertTicketsQueryVariables
          >({
            query: ConcertTicketsDocument,
            variables: {
              concertId,
            },
          });
          if (concertTicketsCache?.concertTickets?.__typename === 'TicketList') {
            cache.writeQuery({
              query: ConcertTicketsDocument,
              variables: {
                concertId,
              },
              data: {
                concertTickets: {
                  ...concertTicketsCache.concertTickets,
                  list: concertTicketsCache.concertTickets.list?.concat({
                    ...addedConcertTicketData,
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
  }, [
    addTicketsForm,
    concertId,
    mutateCreateConcertTicket,
    onClose,
    removeTicketInput,
    loadingCreateConcertTicket,
  ]);

  useEffect(() => {
    if (!visible) {
      setAddTicketsForm([
        {
          name: '',
          website: '',
          opendate: '',
        },
      ]);
    }
  }, [visible]);

  return (
    <AddFormModal
      visible={visible}
      onClose={onClose}
      onClickTopAddButton={addTicketEmptyForm}
      title={'티켓 등록 모달'}
      onClickSubmitForm={onClickBulkAdd}
      formListComponent={
        <Fragment>
          {addTicketsForm.map((ticket, ticketIndex) => (
            <StyledAddTicketModalInner key={ticket.name}>
              <InputWithLabel
                value={ticket.name}
                onChangeText={(text) => {
                  setAddTicketsForm((prev) =>
                    prev.map((prevItem, prevIndex) => {
                      if (prevIndex === ticketIndex) {
                        return {
                          ...prevItem,
                          name: text,
                        };
                      }
                      return prevItem;
                    })
                  );
                }}
                label="티켓 예매처 이름"
                placeholder="티켓 예매처 이름"
              />
              <InputWithLabel
                value={ticket.website}
                onChangeText={(text) => {
                  setAddTicketsForm((prev) =>
                    prev.map((prevItem, prevIndex) => {
                      if (prevIndex === ticketIndex) {
                        return {
                          ...prevItem,
                          website: text,
                        };
                      }
                      return prevItem;
                    })
                  );
                }}
                label="티켓 예매 링크"
                placeholder="티켓 예매 링크"
              />
              <InputWithLabel
                value={ticket.opendate}
                onChangeText={(text) => {
                  setAddTicketsForm((prev) =>
                    prev.map((prevItem, prevIndex) => {
                      if (prevIndex === ticketIndex) {
                        return {
                          ...prevItem,
                          opendate: text,
                        };
                      }
                      return prevItem;
                    })
                  );
                }}
                placeholder={'yyMMddHHmm'}
                label={'티켓 오픈 날짜'}
              />
              <Button
                style={{
                  width: 10,
                  height: 10,
                }}
                theme={'pink'}
                onClick={() =>
                  setAddTicketsForm((prev) => prev.filter((_, index) => index !== ticketIndex))
                }
              >
                ✘
              </Button>
            </StyledAddTicketModalInner>
          ))}
        </Fragment>
      }
    />
  );
};
