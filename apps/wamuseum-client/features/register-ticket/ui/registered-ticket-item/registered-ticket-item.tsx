import useRemoveConcertTicket from '@/app/concert/[id]/mutations/useRemoveConcertTicket'
import {
  concertTicketsQuery,
  UseConcertTicketsDataT,
  UseConcertTicketsInputT,
} from '@/app/concert/[id]/queries/useConcertTickets'
import { Button, colors, Text } from '@coldsurfers/ocean-road'
import { format } from 'date-fns'
import Link from 'next/link'
import { useCallback } from 'react'
import { Maybe, Ticket } from 'src/__generated__/graphql'
import { StyledTicketItemContainer, StyledTicketItemLabel } from './registered-ticket-item.styled'

export const RegisteredTicketItem = ({ ticket, concertId }: { ticket: Maybe<Ticket>; concertId: string }) => {
  const [mutateRemoveConcertTicket, { loading: loadingRemoveConcertTicket }] = useRemoveConcertTicket()
  const onClickDelete = useCallback(() => {
    if (!ticket) {
      return
    }
    if (loadingRemoveConcertTicket) {
      return
    }
    mutateRemoveConcertTicket({
      variables: {
        input: {
          concertId,
          ticketId: ticket.id,
        },
      },
      update: (cache, { data }) => {
        if (data?.removeConcertTicket.__typename !== 'Ticket') {
          return
        }
        const { removeConcertTicket: removedConcertTicketData } = data
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
                list: cacheData.concertTickets.list?.filter((value) => value?.id !== removedConcertTicketData.id),
              },
            },
          })
        }
      },
    })
  }, [concertId, loadingRemoveConcertTicket, mutateRemoveConcertTicket, ticket])

  if (!ticket) {
    return null
  }
  return (
    <StyledTicketItemContainer>
      <StyledTicketItemLabel as="h4">티켓 판매자</StyledTicketItemLabel>
      <Text>🎫 {ticket.seller}</Text>
      <StyledTicketItemLabel as="h4">티켓 판매 링크</StyledTicketItemLabel>
      <Link href={ticket.sellingURL} target="_blank">
        <Text style={{ color: colors.oc.blue[3].value }}>{ticket.sellingURL}</Text>
      </Link>
      <StyledTicketItemLabel as="h4">티켓 오픈 날짜</StyledTicketItemLabel>
      <Text>{format(new Date(ticket.openDate), 'MMM dd, hh:mm a')}</Text>
      <Button theme={'pink'} onClick={onClickDelete} style={{ marginTop: '1rem' }}>
        삭제하기
      </Button>
    </StyledTicketItemContainer>
  )
}
