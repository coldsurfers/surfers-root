'use client'

import {
  AddTicketsUI,
  CreateConcertPosterUI,
  DeleteConcertButton,
  RegisteredConcertArtistUI,
  SearchArtistsUI,
  UpdateConcertPosterUI,
} from '@/features'
import useCreateConcertPosterMutation from '@/hooks/useCreateConcertPosterMutation'
import useUpdateConcertPosterMutation from '@/hooks/useUpdateConcertPosterMutation'
import { presign, uploadToPresignedURL } from '@/utils/fetcher'
import { getPosterS3Url } from '@/utils/get-poster-s3-url'
import pickFile from '@/utils/pickFile'
import { Button, Modal, Spinner, Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { concertPosterQuery } from 'gql/queries'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import useConcertQuery from '../../../hooks/useConcertQuery'
import RegisteredTicketsUI from './components/RegisteredTicketsUI'
import SearchConcertVenueUI from './components/SearchConcertVenueUI'
import useRemoveConcert from './mutations/useRemoveConcert'
import useRemoveConcertVenue from './mutations/useRemoveConcertVenue'
import { StyledContent, StyledLabel } from './page.styled'
import useConcertArtists from './queries/useConcertArtists'
import useConcertPoster from './queries/useConcertPoster'
import useConcertVenues, {
  UseConcertVenuesDataT,
  UseConcertVenuesInputT,
  concertVenuesQuery,
} from './queries/useConcertVenues'

export const ConcertIdPageClient = ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const { id } = params
  const router = useRouter()
  const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false)

  const { data: concertData, loading: concertLoading } = useConcertQuery({
    variables: {
      concertId: id,
    },
  })

  const { data: concertArtists } = useConcertArtists({
    variables: {
      concertId: id,
    },
  })
  const { data: concertPosterData } = useConcertPoster({
    variables: {
      concertId: id,
    },
  })
  const { data: concertVenuesData } = useConcertVenues({
    variables: {
      concertId: id,
    },
  })

  const [mutateRemoveConcert, { loading: removeConcertLoading }] = useRemoveConcert({})

  const [mutateRemoveConcertVenue, { loading: removeConcertVenueLoading }] = useRemoveConcertVenue({})

  const [mutateUpdateConcertPoster, { loading: updateConcertPosterLoading }] = useUpdateConcertPosterMutation()
  const [mutateCreateConcertPoster, { loading: createConcertPosterLoading }] = useCreateConcertPosterMutation()

  const concert = useMemo(() => {
    if (!concertData?.concert) return null
    switch (concertData.concert.__typename) {
      case 'HttpError':
        return null
      case 'Concert':
        return concertData.concert
      default:
        return null
    }
  }, [concertData])

  const concertPoster = useMemo(() => {
    if (concertPosterData?.concertPoster.__typename === 'PosterList') {
      return concertPosterData.concertPoster.list?.at(0)
    }
    return null
  }, [concertPosterData])

  const thumbnailURL = useMemo<string | null>(() => {
    return concertPoster?.imageURL ?? null
  }, [concertPoster?.imageURL])

  const artistsResult = useMemo(() => {
    if (concertArtists?.concertArtists.__typename === 'ArtistList') {
      return concertArtists.concertArtists.list ?? []
    }
    return []
  }, [concertArtists])

  const venuesResult = useMemo(() => {
    if (concertVenuesData?.concertVenues.__typename === 'ConcertVenueList') {
      return concertVenuesData.concertVenues.list ?? []
    }
    return []
  }, [concertVenuesData])

  const onClickConfirmDelete = useCallback(() => {
    mutateRemoveConcert({
      variables: {
        input: {
          id,
        },
      },
      update: (cache, { data }) => {
        if (!data || !data.removeConcert) return
        const { removeConcert } = data
        if (removeConcert.__typename !== 'Concert') return
        const normalizedId = cache.identify({
          id: removeConcert.id,
          __typename: 'Concert',
        })
        cache.evict({ id: normalizedId })
        cache.gc()
      },
    }).then(() => {
      router.push('/')
    })
  }, [id, mutateRemoveConcert, router])

  const onClickCreatePoster = useCallback(() => {
    if (!concert) return
    pickFile(async (e) => {
      const { target } = e
      if (!target) return
      const filename = new Date().toISOString()
      // @ts-expect-error
      const { files } = target
      const presignedData = await presign({
        filename,
        filetype: 'image/*',
        type: 'poster-thumbnails',
      })
      await uploadToPresignedURL({
        data: presignedData,
        file: files[0],
      })
      mutateCreateConcertPoster({
        variables: {
          input: {
            concertId: concert.id,
            imageURL: getPosterS3Url(filename),
          },
        },
        update: (cache, { data }) => {
          if (!concert) {
            return
          }
          if (data?.createConcertPoster.__typename !== 'Poster') {
            return
          }
          cache.writeQuery({
            query: concertPosterQuery,
            variables: {
              concertId: concert.id,
            },
            data: {
              concertPoster: {
                __typename: 'PosterList',
                list: [data.createConcertPoster],
              },
            },
          })
        },
      })
    })
  }, [concert, mutateCreateConcertPoster])

  const onClickUpdatePoster = useCallback(async () => {
    if (!concertPoster) return
    pickFile(async (e) => {
      const { target } = e
      if (!target) return
      const filename = new Date().toISOString()
      // @ts-expect-error
      const { files } = target
      const presignedData = await presign({
        filename,
        filetype: 'image/*',
        type: 'poster-thumbnails',
      })
      await uploadToPresignedURL({
        data: presignedData,
        file: files[0],
      })
      mutateUpdateConcertPoster({
        variables: {
          input: {
            id: concertPoster.id,
            imageURL: getPosterS3Url(filename),
          },
        },
        update: (cache, { data }) => {
          if (!data || !data.updateConcertPoster) return
          const { updateConcertPoster } = data
          if (updateConcertPoster.__typename !== 'ConcertPoster') return
          const existingConcertPoster = cache.readQuery({ query: concertPosterQuery })
          if (existingConcertPoster && updateConcertPoster) {
            cache.writeQuery({
              query: concertPosterQuery,
              variables: {
                concertId: concert?.id ?? '',
              },
              data: {
                ...existingConcertPoster,
                concertPoster: {
                  list: [updateConcertPoster],
                },
              },
            })
          }
        },
      })
    })
  }, [concert?.id, concertPoster, mutateUpdateConcertPoster])

  if (concertLoading) {
    return <Spinner variant="page-overlay" />
  }

  return (
    <Wrapper>
      <Title>{concert?.title}</Title>
      <DeleteConcertButton onClick={() => setDeleteConfirmModalVisible(true)} />
      <InnerWrapper>
        <LeftWrapper>
          {thumbnailURL ? (
            <UpdateConcertPosterUI imageURL={thumbnailURL} onClickUpdate={onClickUpdatePoster} />
          ) : (
            <CreateConcertPosterUI onClick={onClickCreatePoster} />
          )}
        </LeftWrapper>
        <RightWrapper>
          <StyledLabel as="h3">아티스트</StyledLabel>
          <StyledContent>
            {artistsResult.map((value) => {
              if (!value) return null
              return <RegisteredConcertArtistUI key={value.id} value={value} concertId={id} />
            }) || '등록된 아티스트가 없습니다.'}
            <SearchArtistsUI concertId={id} />
          </StyledContent>
          <StyledLabel as="h3">공연장소</StyledLabel>
          <StyledContent>
            {venuesResult.map((value) => {
              if (!value) return null
              return (
                <div key={value.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <div>{value.name}</div>
                  <Button
                    style={{
                      width: 10,
                      height: 10,
                      marginLeft: 8,
                    }}
                    color={'pink'}
                    onClick={() => {
                      mutateRemoveConcertVenue({
                        variables: {
                          input: {
                            concertId: id,
                            venueId: value.id,
                          },
                        },
                        update: (cache, { data }) => {
                          if (data?.removeConcertVenue.__typename !== 'Venue') {
                            return
                          }
                          const { id: removedConcertVenueId } = data.removeConcertVenue
                          const cacheData = cache.readQuery<UseConcertVenuesDataT, UseConcertVenuesInputT>({
                            query: concertVenuesQuery,
                            variables: {
                              concertId: id,
                            },
                          })
                          if (!cacheData) {
                            return
                          }
                          const { concertVenues } = cacheData
                          if (concertVenues.__typename === 'ConcertVenueList') {
                            cache.writeQuery({
                              query: concertVenuesQuery,
                              variables: {
                                concertId: id,
                              },
                              data: {
                                concertVenues: {
                                  ...concertVenues,
                                  list: concertVenues.list?.filter((venue) => venue?.id !== removedConcertVenueId),
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
            }) || '등록된 공연장소가 없습니다.'}
          </StyledContent>
          <SearchConcertVenueUI concertId={id} />
          <StyledLabel>공연 날짜</StyledLabel>
          <StyledContent>
            {concert?.date ? format(new Date(concert.date), 'yyyy-MM-dd hh:mm a') : '등록된 공연날짜가 없습니다.'}
          </StyledContent>

          <StyledLabel>티켓 정보</StyledLabel>
          <RegisteredTicketsUI concertId={id} />
          <AddTicketsUI concertId={id} />

          <StyledLabel>등록일</StyledLabel>
          {concert?.createdAt ? (
            <StyledContent>{format(new Date(concert.createdAt), 'yyyy-MM-dd hh:mm a')}</StyledContent>
          ) : null}
          {concert?.updatedAt && (
            <>
              <StyledLabel>수정일</StyledLabel>
              <StyledContent>{format(new Date(concert.updatedAt), 'yyyy-MM-dd hh:mm a')}</StyledContent>
            </>
          )}
        </RightWrapper>
      </InnerWrapper>
      {removeConcertLoading || removeConcertVenueLoading || createConcertPosterLoading || updateConcertPosterLoading ? (
        <Spinner variant="page-overlay" />
      ) : null}
      <Modal visible={deleteConfirmModalVisible} onClose={() => setDeleteConfirmModalVisible(false)}>
        <Text>확인을 누르면 해당 콘서트를 삭제해요.</Text>
        <Button onClick={onClickConfirmDelete}>확인</Button>
      </Modal>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 25px;

  padding-left: 150px;
  padding-right: 150px;
`

const InnerWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 28px;
  overflow-x: auto;
  min-width: 725px;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
`
