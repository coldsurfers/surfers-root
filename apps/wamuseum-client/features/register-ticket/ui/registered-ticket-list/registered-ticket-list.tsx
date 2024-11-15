import { useMemo } from 'react'
import useConcertTickets from '../../../../app/concert/[id]/queries/useConcertTickets'
import { RegisteredTicketItem } from '../registered-ticket-item'
import { StyledTicketListContainer } from './registered-ticket-list.styled'

export const RegisteredTicketList = ({ concertId }: { concertId: string }) => {
  const { data: ticketsData } = useConcertTickets({
    variables: {
      concertId,
    },
  })
  const tickets = useMemo(() => {
    if (ticketsData?.concertTickets.__typename === 'TicketList') {
      return ticketsData.concertTickets.list ?? []
    }
    return []
  }, [ticketsData])

  return (
    <StyledTicketListContainer>
      {tickets.map((ticket) => (
        <RegisteredTicketItem key={ticket?.id} ticket={ticket} concertId={concertId} />
      ))}
    </StyledTicketListContainer>
  )
}
