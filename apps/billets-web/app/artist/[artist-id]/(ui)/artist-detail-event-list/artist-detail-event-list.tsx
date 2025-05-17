'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns/format'
import { useMemo } from 'react'
import {
  StyledArtistDetailEventListContainer,
  StyledArtistDetailEventListItem,
  StyledArtistDetailEventListItemDate,
  StyledArtistDetailEventListItemDescriptionWrapper,
  StyledArtistDetailEventListItemThumbnail,
  StyledArtistDetailEventListItemThumbnailEmpty,
  StyledArtistDetailEventListItemThumbnailEmptyText,
  StyledArtistDetailEventListItemTitle,
  StyledArtistDetailEventListItemVenueText,
  StyledArtistDetailEventListTitleText,
} from './artist-detail-event-list.styled'

export function ArtistDetailEventList({ artistId }: { artistId: string }) {
  const { data: artistDetail } = useQuery({
    queryKey: apiClient.artist.queryKeys.detail(artistId),
    queryFn: () => apiClient.artist.getArtistDetail(artistId),
  })

  const upcomingEvents = useMemo(() => {
    return artistDetail?.upcomingEvents ?? []
  }, [artistDetail?.upcomingEvents])

  return (
    <>
      <StyledArtistDetailEventListTitleText as="h3">Upcoming Events</StyledArtistDetailEventListTitleText>
      <StyledArtistDetailEventListContainer>
        {upcomingEvents.map((event) => {
          const thumbUrl = event.data.mainPoster?.url ? `${event.data.mainPoster.url}` : ''
          return (
            <StyledArtistDetailEventListItem key={event.data.id} href={`/event/${event.data.slug}`}>
              {thumbUrl ? (
                <StyledArtistDetailEventListItemThumbnail src={thumbUrl} />
              ) : (
                <StyledArtistDetailEventListItemThumbnailEmpty>
                  <StyledArtistDetailEventListItemThumbnailEmptyText>
                    {event.data.title}
                  </StyledArtistDetailEventListItemThumbnailEmptyText>
                </StyledArtistDetailEventListItemThumbnailEmpty>
              )}
              <StyledArtistDetailEventListItemDescriptionWrapper>
                <StyledArtistDetailEventListItemTitle as="h4">{event.data.title}</StyledArtistDetailEventListItemTitle>
                <StyledArtistDetailEventListItemDate as="p">
                  {format(new Date(event.data.date), 'EEE, MMM dd')}
                </StyledArtistDetailEventListItemDate>
                <StyledArtistDetailEventListItemVenueText>
                  {event.data.mainVenue?.name}
                </StyledArtistDetailEventListItemVenueText>
              </StyledArtistDetailEventListItemDescriptionWrapper>
            </StyledArtistDetailEventListItem>
          )
        })}
      </StyledArtistDetailEventListContainer>
    </>
  )
}
