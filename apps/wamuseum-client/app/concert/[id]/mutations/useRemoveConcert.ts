import { gql, useMutation } from '@apollo/client'
import { RemoveConcertData, RemoveConcertInput } from '../../../../src/__generated__/graphql'
import { CommonMutationHookOptions } from '../../../../libs/types'

const mutation = gql`
  mutation RemoveConcert($input: RemoveConcertInput!) {
    removeConcert(input: $input) {
      ... on Concert {
        id
      }
    }
  }
`

type DataT = {
  removeConcert: RemoveConcertData
}

type InputT = {
  input: RemoveConcertInput
}

const useRemoveConcert = (options: CommonMutationHookOptions<DataT, InputT>) =>
  useMutation<DataT, InputT>(mutation, options)

export default useRemoveConcert
