'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useMemo } from 'react'
import {
  StyledVenueDetailEventListItem,
  StyledVenueDetailEventListItemDateText,
  StyledVenueDetailEventListItemThumbnail,
  StyledVenueDetailEventListItemTitleText,
  StyledVenueDetailEventListItemVenueText,
  StyledVenueDetailEventListLayout,
  StyledVenueDetailEventListTitleText,
  StyledVenueDetailItemDescriptionWrapper,
} from './venue-detail-event-list.styled'

export function VenueDetailEventList({ venueId }: { venueId: string }) {
  const { data: venueDetail } = useQuery({
    queryKey: apiClient.venue.queryKeys.detail(venueId),
    queryFn: () => apiClient.venue.getVenueDetail(venueId),
  })
  const upcomingEvents = useMemo(() => {
    return venueDetail?.upcomingEvents ?? []
  }, [venueDetail?.upcomingEvents])

  return (
    <>
      <StyledVenueDetailEventListTitleText as="h3">Upcoming Events</StyledVenueDetailEventListTitleText>
      <StyledVenueDetailEventListLayout>
        {upcomingEvents.map((value) => {
          const { mainPoster } = value.data
          const posterUrl = mainPoster?.url ? `${mainPoster.url}&width=400&height=400&format=png` : ''
          const formattedDate = format(new Date(value.data.date), 'EEE, MMM dd')
          return (
            <StyledVenueDetailEventListItem key={value.data.id} href={`/event/${value.data.id}`}>
              <StyledVenueDetailEventListItemThumbnail src={posterUrl} />
              <StyledVenueDetailItemDescriptionWrapper>
                <StyledVenueDetailEventListItemTitleText as="h4">
                  {value.data.title}
                </StyledVenueDetailEventListItemTitleText>
                <StyledVenueDetailEventListItemDateText as="p">{formattedDate}</StyledVenueDetailEventListItemDateText>
                <StyledVenueDetailEventListItemVenueText as="p">
                  {value.data.mainVenue?.name}
                </StyledVenueDetailEventListItemVenueText>
              </StyledVenueDetailItemDescriptionWrapper>
            </StyledVenueDetailEventListItem>
          )
        })}
      </StyledVenueDetailEventListLayout>
    </>
  )
}
