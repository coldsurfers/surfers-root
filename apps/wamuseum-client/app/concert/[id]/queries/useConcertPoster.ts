import { useQuery } from '@apollo/client'
import { concertPosterQuery } from '../../../../gql/queries'
import { ConcertPosterData } from '../../../../src/__generated__/graphql'
import { CommonQueryHookOptions } from '../../../../libs/types'

type DataT = {
  concertPoster: ConcertPosterData
}

type InputT = {
  concertId: string
}

const useConcertPoster = (options: CommonQueryHookOptions<DataT, InputT>) =>
  useQuery<DataT, InputT>(concertPosterQuery, options)

export default useConcertPoster
