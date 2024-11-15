import { useMemo } from 'react'
import useConcertTickets from '../../../../app/concert/[id]/queries/useConcertTickets'
import { RegisteredTicketItem } from '../registered-ticket-item'

export const RegisteredTicketsUI = ({ concertId }: { concertId: string }) => {
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
    <>
      {tickets.map((ticket) => {
        return <RegisteredTicketItem key={ticket?.id} ticket={ticket} concertId={concertId} />
      })}
    </>
  )
}
