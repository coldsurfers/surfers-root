import { Button, Spinner, Text } from '@coldsurfers/ocean-road'
import { useMemo } from 'react'
import useRemoveConcertTicket from '../../../../app/concert/[id]/mutations/useRemoveConcertTicket'
import useConcertTickets, {
  UseConcertTicketsDataT,
  UseConcertTicketsInputT,
  concertTicketsQuery,
} from '../../../../app/concert/[id]/queries/useConcertTickets'

export const RegisterTicketsUI = ({ concertId }: { concertId: string }) => {
  const { data: ticketsData } = useConcertTickets({
    variables: {
      concertId,
    },
  })
  const [mutateRemoveConcertTicket, { loading: loadingRemoveConcertTicket }] = useRemoveConcertTicket({})
  const tickets = useMemo(() => {
    if (ticketsData?.concertTickets.__typename === 'TicketList') {
      return ticketsData.concertTickets.list ?? []
    }
    return []
  }, [ticketsData])

  return (
    <>
      {tickets.map((ticket) => {
        if (!ticket) {
          return null
        }
        return (
          <div key={ticket.id} style={{ display: 'flex', alignItems: 'center' }}>
            <Text>{ticket.seller}</Text>
            <Text style={{ marginLeft: 8 }}>{ticket.sellingURL}</Text>
            <Text style={{ marginLeft: 8 }}>{ticket.openDate}</Text>
            <Button
              style={{
                width: 10,
                height: 10,
              }}
              color={'pink'}
              onClick={() => {
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
                            list: cacheData.concertTickets.list?.filter(
                              (value) => value?.id !== removedConcertTicketData.id,
                            ),
                          },
                        },
                      })
                    }
                  },
                })
              }}
            >
              ✘
            </Button>
          </div>
        )
      })}
      {loadingRemoveConcertTicket ? <Spinner variant="page-overlay" /> : null}
    </>
  )
}
