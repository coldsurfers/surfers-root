import { gql, useQuery } from '@apollo/client'
import { CommonQueryHookOptions } from '../../../../libs/types'
import { SearchArtistsData } from '../../../../src/__generated__/graphql'

const searchArtistsQuery = gql`
  query SearchArtists($keyword: String!) {
    searchArtists(keyword: $keyword) {
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
  searchArtists: SearchArtistsData
}

type InputT = {
  keyword: string
}

const useSearchArtists = (options: CommonQueryHookOptions<DataT, InputT>) =>
  useQuery<DataT, InputT>(searchArtistsQuery, options)

export default useSearchArtists
