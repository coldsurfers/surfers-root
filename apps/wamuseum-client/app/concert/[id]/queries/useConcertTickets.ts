import { gql, useQuery } from '@apollo/client'
import { CommonQueryHookOptions } from '../../../../libs/types'
import { ConcertTicketsData } from '../../../../src/__generated__/graphql'

export const concertTicketsQuery = gql`
  query ConcertTickets($concertId: String!) {
    concertTickets(concertId: $concertId) {
      ... on TicketList {
        list {
          id
          openDate
          seller
          sellingURL
        }
      }
    }
  }
`

export type UseConcertTicketsDataT = {
  concertTickets: ConcertTicketsData
}

export type UseConcertTicketsInputT = {
  concertId: string
}

const useConcertTickets = (options: CommonQueryHookOptions<UseConcertTicketsDataT, UseConcertTicketsInputT>) =>
  useQuery<UseConcertTicketsDataT, UseConcertTicketsInputT>(concertTicketsQuery, options)

export default useConcertTickets
