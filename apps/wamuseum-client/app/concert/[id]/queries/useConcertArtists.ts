import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { ConcertArtistsQuery, ConcertArtistsQueryVariables } from '../../../../src/__generated__/graphql'

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

const useConcertArtists = (options: QueryHookOptions<ConcertArtistsQuery, ConcertArtistsQueryVariables>) =>
  useQuery<ConcertArtistsQuery, ConcertArtistsQueryVariables>(concertArtistsQuery, options)

export default useConcertArtists
