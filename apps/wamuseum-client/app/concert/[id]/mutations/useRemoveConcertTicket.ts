import { gql, useMutation } from '@apollo/client'
import { CommonMutationHookOptions } from '../../../../libs/types'
import { RemoveConcertTicketData, RemoveConcertTicketInput } from '../../../../src/__generated__/graphql'

export const removeConcertTicketMutation = gql`
  mutation RemoveConcertTicket($input: RemoveConcertTicketInput!) {
    removeConcertTicket(input: $input) {
      ... on Ticket {
        id
      }
    }
  }
`

export type UseRemoveConcertTicketDataT = {
  removeConcertTicket: RemoveConcertTicketData
}

export type UseRemoveConcertTicketInputT = {
  input: RemoveConcertTicketInput
}

const useRemoveConcertTicket = (
  options?: CommonMutationHookOptions<UseRemoveConcertTicketDataT, UseRemoveConcertTicketInputT>,
) => useMutation<UseRemoveConcertTicketDataT, UseRemoveConcertTicketInputT>(removeConcertTicketMutation, options)

export default useRemoveConcertTicket
