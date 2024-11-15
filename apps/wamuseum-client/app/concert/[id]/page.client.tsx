'use client'

import {
  AddTicketsUI,
  ConcertVenueList,
  CreateConcertPosterUI,
  DeleteConcertButton,
  DeleteConcertConfirmModal,
  RegisteredConcertArtistList,
  RegisteredTicketList,
  SearchArtistsUI,
  SearchConcertVenueUI,
  UpdateConcertPosterUI,
} from '@/features'
import { Spinner } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import useConcertQuery from '../../../hooks/useConcertQuery'
import { StyledContent, StyledLabel } from './page.styled'
import useConcertArtists from './queries/useConcertArtists'
import useConcertPoster from './queries/useConcertPoster'
import useConcertVenues from './queries/useConcertVenues'

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

  if (concertLoading || !concert) {
    return <Spinner variant="page-overlay" />
  }

  return (
    <Wrapper>
      {/* Concert Title */}
      <Title>{concert.title}</Title>
      <DeleteConcertButton onClick={() => setDeleteConfirmModalVisible(true)} />
      <InnerWrapper>
        <LeftWrapper>
          {/* Poster */}
          {thumbnailURL ? (
            <UpdateConcertPosterUI concertId={concert.id} />
          ) : (
            <CreateConcertPosterUI concertId={concert.id} />
          )}
        </LeftWrapper>
        <RightWrapper>
          {/* Artist */}
          <StyledLabel as="h3">아티스트</StyledLabel>
          <StyledContent>
            <RegisteredConcertArtistList artists={artistsResult} concertId={concert.id} />
            <SearchArtistsUI concertId={id} />
          </StyledContent>
          {/* Venue */}
          <StyledLabel as="h3">공연장소</StyledLabel>
          <StyledContent>
            <ConcertVenueList concertId={concert.id} venues={venuesResult} />
            <SearchConcertVenueUI concertId={id} />
          </StyledContent>
          {/* Concert Date */}
          <StyledLabel as="h3">공연 날짜</StyledLabel>
          <StyledContent>
            {concert?.date ? format(new Date(concert.date), 'MMM dd, hh:mm a') : '등록된 공연날짜가 없습니다.'}
          </StyledContent>
          {/* Ticket */}
          <StyledLabel as="h3">티켓 정보</StyledLabel>
          <RegisteredTicketList concertId={id} />
          <AddTicketsUI concertId={id} />
          {/* Created At */}
          <StyledLabel as="h3">등록일</StyledLabel>
          {concert?.createdAt ? (
            <StyledContent>{format(new Date(concert.createdAt), 'MMM dd, hh:mm a')}</StyledContent>
          ) : null}
          {concert?.updatedAt && (
            <>
              <StyledLabel>수정일</StyledLabel>
              <StyledContent>{format(new Date(concert.updatedAt), 'yyyy-MM-dd hh:mm a')}</StyledContent>
            </>
          )}
        </RightWrapper>
      </InnerWrapper>
      <DeleteConcertConfirmModal
        concertId={concert.id}
        onClose={() => setDeleteConfirmModalVisible(false)}
        visible={deleteConfirmModalVisible}
        onDeleteSuccess={() => router.push('/')}
      />
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
