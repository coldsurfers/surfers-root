import useCreateConcertTicket from '@/app/concert/[id]/mutations/useCreateConcertTicket'
import {
  concertTicketsQuery,
  UseConcertTicketsDataT,
  UseConcertTicketsInputT,
} from '@/app/concert/[id]/queries/useConcertTickets'
import { AddButton } from '@/ui'
import InputWithLabel from '@/ui/InputWithLabel'
import { Button, Modal, Text } from '@coldsurfers/ocean-road'
import { isValid } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { parseDate } from '../add-tickets-ui/add-tickets-ui.utils'
import { StyledAddTicketModalInner, StyledAddTicketModalTop } from './add-ticket-modal.styled'
import { AddTicketForm } from './add-ticket-modal.types'

export const AddTicketModal = ({
  visible,
  onClose,
  concertId,
}: {
  visible: boolean
  onClose: () => void
  concertId: string
}) => {
  const [addTicketsForm, setAddTicketsForm] = useState<AddTicketForm[]>([
    {
      name: '',
      website: '',
      opendate: '',
    },
  ])
  const [mutateCreateConcertTicket, { loading: loadingCreateConcertTicket }] = useCreateConcertTicket({})

  const addTicketEmptyForm = useCallback(() => {
    setAddTicketsForm((prev) =>
      prev.concat({
        name: '',
        website: '',
        opendate: '',
      }),
    )
  }, [])

  const removeTicketInput = useCallback((index: number) => {
    setAddTicketsForm((prev) => prev.filter((value, prevIndex) => prevIndex !== index))
  }, [])

  const onClickBulkAdd = useCallback(async () => {
    if (loadingCreateConcertTicket) {
      return
    }
    const shouldOpenAlert = addTicketsForm.some((ticket) => {
      const isValidOpenDate = isValid(parseDate(ticket.opendate))
      return !isValidOpenDate
    })
    if (shouldOpenAlert) {
      alert('Invalid Ticket Open Date')
      return
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
          removeTicketInput(ticketIndex)
        },
        update: (cache, { data }) => {
          if (data?.createConcertTicket.__typename !== 'Ticket') {
            return
          }
          const { createConcertTicket: addedConcertTicketData } = data
          const cacheData = cache.readQuery<UseConcertTicketsDataT, UseConcertTicketsInputT>({
            query: concertTicketsQuery,
            variables: {
              concertId,
            },
          })
          if (cacheData?.concertTickets.__typename === 'TicketList') {
            cache.writeQuery({
              query: concertTicketsQuery,
              variables: {
                concertId,
              },
              data: {
                concertTickets: {
                  ...cacheData.concertTickets,
                  list: cacheData.concertTickets.list?.concat({
                    ...addedConcertTicketData,
                  }),
                },
              },
            })
          }
        },
      })
    })
    await Promise.all(promises)
    onClose()
  }, [addTicketsForm, concertId, mutateCreateConcertTicket, onClose, removeTicketInput, loadingCreateConcertTicket])

  useEffect(() => {
    if (!visible) {
      setAddTicketsForm([
        {
          name: '',
          website: '',
          opendate: '',
        },
      ])
    }
  }, [visible])

  return (
    <Modal visible={visible} onClose={onClose}>
      <StyledAddTicketModalTop>
        <Text as="h3">티켓 등록 모달</Text>
        <AddButton onClick={addTicketEmptyForm} />
      </StyledAddTicketModalTop>
      {addTicketsForm.map((ticket, ticketIndex) => (
        <StyledAddTicketModalInner key={ticketIndex}>
          <InputWithLabel
            value={ticket.name}
            onChangeText={(text) => {
              setAddTicketsForm((prev) =>
                prev.map((prevItem, prevIndex) => {
                  if (prevIndex === ticketIndex) {
                    return {
                      ...prevItem,
                      name: text,
                    }
                  }
                  return prevItem
                }),
              )
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
                    }
                  }
                  return prevItem
                }),
              )
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
                    }
                  }
                  return prevItem
                }),
              )
            }}
            placeholder={'yyMMddHHmm'}
            label={`티켓 오픈 날짜`}
          />
          <Button
            style={{
              width: 10,
              height: 10,
            }}
            theme={'pink'}
            onClick={() => setAddTicketsForm((prev) => prev.filter((_, index) => index !== ticketIndex))}
          >
            ✘
          </Button>
        </StyledAddTicketModalInner>
      ))}
      <Button style={{ width: '100%' }} theme={'indigo'} onClick={onClickBulkAdd}>
        등록하기
      </Button>
    </Modal>
  )
}
