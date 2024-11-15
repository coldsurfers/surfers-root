import { Button, Text } from '@coldsurfers/ocean-road'
import { useCallback } from 'react'
import useRemoveConcertArtist from '../../../../app/concert/[id]/mutations/useRemoveConcertArtist'
import { concertArtistsQuery } from '../../../../app/concert/[id]/queries/useConcertArtists'
import { Artist, ConcertArtistData } from '../../../../src/__generated__/graphql'
import { StyledRegisteredConcertArtistUIContainer } from './registered-concert-artist-ui.styled'

export const RegisteredConcertArtistUI = ({ value, concertId }: { value: Artist; concertId: string }) => {
  const [mutateRemoveConcertArtist] = useRemoveConcertArtist({})
  const onClickDelete = useCallback(() => {
    mutateRemoveConcertArtist({
      variables: {
        input: {
          artistId: value.id,
          concertId,
        },
      },
      update: (cache, { data }) => {
        if (data?.removeConcertArtist.__typename !== 'Artist') {
          return
        }
        const { id: removeArtistId } = data.removeConcertArtist
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
            variables: {
              concertId,
            },
            data: {
              concertArtists: {
                ...concertArtists,
                list: concertArtists.list?.filter((artist) => artist?.id !== removeArtistId),
              },
            },
          })
        }
      },
    })
  }, [concertId, mutateRemoveConcertArtist, value.id])
  return (
    <StyledRegisteredConcertArtistUIContainer>
      <Text as="p" style={{ margin: 'unset' }}>
        {value.name}
      </Text>
      <Button
        style={{
          marginLeft: 'auto',
        }}
        theme={'pink'}
        onClick={onClickDelete}
      >
        삭제하기
      </Button>
    </StyledRegisteredConcertArtistUIContainer>
  )
}
