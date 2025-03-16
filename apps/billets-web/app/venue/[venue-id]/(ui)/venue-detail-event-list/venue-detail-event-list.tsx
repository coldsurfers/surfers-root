'use client'

import { initialPageQuery } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useMemo } from 'react'
import {
  StyledVenueDetailEventListItem,
  StyledVenueDetailEventListItemDateText,
  StyledVenueDetailEventListItemThumbnail,
  StyledVenueDetailEventListItemThumbnailEmpty,
  StyledVenueDetailEventListItemThumbnailEmptyText,
  StyledVenueDetailEventListItemTitleText,
  StyledVenueDetailEventListItemVenueText,
  StyledVenueDetailEventListLayout,
  StyledVenueDetailEventListTitleText,
  StyledVenueDetailItemDescriptionWrapper,
} from './venue-detail-event-list.styled'

export function VenueDetailEventList({ venueId }: { venueId: string }) {
  const { data: venueDetail } = useQuery(initialPageQuery.venueDetail(venueId))
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
            <StyledVenueDetailEventListItem key={value.data.id} href={`/event/${value.data.slugi}`}>
              {posterUrl ? (
                <StyledVenueDetailEventListItemThumbnail src={posterUrl} />
              ) : (
                <StyledVenueDetailEventListItemThumbnailEmpty>
                  <StyledVenueDetailEventListItemThumbnailEmptyText>
                    {value.data.title}
                  </StyledVenueDetailEventListItemThumbnailEmptyText>
                </StyledVenueDetailEventListItemThumbnailEmpty>
              )}
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
