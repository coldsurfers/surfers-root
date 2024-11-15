'use client'

import { Spinner, Text, TextInput, colors } from '@coldsurfers/ocean-road'
import { useDebounce } from '@uidotdev/usehooks'
import { useMemo, useState } from 'react'
import useCreateConcertArtist from '../../../../app/concert/[id]/mutations/useCreateConcertArtist'
import { concertArtistsQuery } from '../../../../app/concert/[id]/queries/useConcertArtists'
import useSearchArtists from '../../../../app/concert/[id]/queries/useSearchArtists'
import { ConcertArtistData } from '../../../../src/__generated__/graphql'
import { StyledSearchResultWrapper } from './search-artist-ui.styled'

export const SearchArtistsUI = ({ concertId }: { concertId: string }) => {
  const [searchArtistKeyword, setSearchArtistKeyword] = useState('')
  const debouncedSearchArtistKeyword = useDebounce(searchArtistKeyword, 350)
  const { data: searchedArtists, loading: loadingSearchArtists } = useSearchArtists({
    variables: {
      keyword: debouncedSearchArtistKeyword,
    },
  })

  const [mutateCreateConcertArtist] = useCreateConcertArtist({})

  const artistSearchResult = useMemo(() => {
    if (searchedArtists?.searchArtists.__typename === 'ArtistList') {
      return searchedArtists.searchArtists.list ?? []
    }
    return []
  }, [searchedArtists])

  return (
    <>
      <TextInput
        value={searchArtistKeyword}
        onChange={(event) => setSearchArtistKeyword(event.target.value)}
        placeholder="아티스트 검색"
      />
      {artistSearchResult.length > 0 ? (
        <StyledSearchResultWrapper>
          {artistSearchResult.map((result) => (
            <div
              key={result?.id}
              onClick={() => {
                if (!result || !result.id) {
                  return
                }
                mutateCreateConcertArtist({
                  variables: {
                    input: {
                      artistId: result.id,
                      concertId,
                    },
                  },
                  update: (cache, { data }) => {
                    if (data?.createConcertArtist.__typename !== 'Artist') {
                      return
                    }
                    const cacheData = cache.readQuery<
                      {
                        concertArtists: ConcertArtistData
                      },
                      {
                        concertId: string
                      }
                    >({
                      query: concertArtistsQuery,
                      variables: {
                        concertId,
                      },
                    })
                    if (!cacheData) {
                      return
                    }
                    const { concertArtists } = cacheData
                    if (concertArtists.__typename === 'ArtistList') {
                      cache.writeQuery({
                        query: concertArtistsQuery,
                        data: {
                          concertArtists: {
                            ...concertArtists,
                            list: concertArtists.list?.concat({
                              id: data.createConcertArtist.id,
                              name: data.createConcertArtist.name,
                            }),
                          },
                        },
                        variables: {
                          concertId,
                        },
                      })
                    }
                  },
                })
              }}
              style={{
                background: colors.oc.white.value,
                cursor: 'pointer',
              }}
            >
              <Text>{result?.name}</Text>
            </div>
          ))}
        </StyledSearchResultWrapper>
      ) : null}
      {loadingSearchArtists ? <Spinner variant="page-overlay" /> : null}
    </>
  )
}
