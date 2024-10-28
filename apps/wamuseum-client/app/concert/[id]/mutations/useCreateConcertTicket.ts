import { gql, useMutation } from '@apollo/client'
import { CommonMutationHookOptions } from '../../../../libs/types'
import { CreateConcertTicketData, CreateConcertTicketInput } from '../../../../src/__generated__/graphql'

const createConcertTicketMutation = gql`
  mutation CreateConcertTicket($input: CreateConcertTicketInput!) {
    createConcertTicket(input: $input) {
      ... on Ticket {
        id
        openDate
        seller
        sellingURL
      }
    }
  }
`

type DataT = {
  createConcertTicket: CreateConcertTicketData
}

type InputT = {
  input: CreateConcertTicketInput
}

const useCreateConcertTicket = (options: CommonMutationHookOptions<DataT, InputT>) =>
  useMutation<DataT, InputT>(createConcertTicketMutation, options)

export default useCreateConcertTicket
