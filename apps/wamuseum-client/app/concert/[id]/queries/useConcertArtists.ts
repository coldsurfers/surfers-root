import { gql, useQuery } from '@apollo/client'
import { CommonQueryHookOptions } from '../../../../libs/types'
import { ConcertArtistData } from '../../../../src/__generated__/graphql'

export const concertArtistsQuery = gql`
  query ConcertArtists($concertId: String!) {
    concertArtists(concertId: $concertId) {
      ... on ArtistList {
        list {
          id
          name
        }
      }
    }
  }
`

type DataT = {
  concertArtists: ConcertArtistData
}

type InputT = {
  concertId: string
}

const useConcertArtists = (options: CommonQueryHookOptions<DataT, InputT>) =>
  useQuery<DataT, InputT>(concertArtistsQuery, options)

export default useConcertArtists
