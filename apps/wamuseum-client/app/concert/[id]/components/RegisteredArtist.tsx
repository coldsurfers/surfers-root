import { Button, Text } from '@coldsurfers/ocean-road'
import { Artist, ConcertArtistData } from '../../../../src/__generated__/graphql'
import useRemoveConcertArtist from '../mutations/useRemoveConcertArtist'
import { concertArtistsQuery } from '../queries/useConcertArtists'

const RegisteredArtist = ({ value, concertId }: { value: Artist; concertId: string }) => {
  const [mutateRemoveConcertArtist] = useRemoveConcertArtist({})
  return (
    <div key={value.id} style={{ display: 'flex', alignItems: 'center' }}>
      <Text style={{ fontWeight: '500', fontSize: 23 }}>{value.name}</Text>
      <Button
        style={{
          width: 10,
          height: 10,
          marginLeft: 8,
        }}
        color={'pink'}
        onClick={() => {
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
        }}
      >
        ✘
      </Button>
    </div>
  )
}

export default RegisteredArtist
