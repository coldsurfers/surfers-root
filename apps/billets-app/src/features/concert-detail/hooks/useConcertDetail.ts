import { useMemo } from 'react';
import type { ConcertDetailSectionListSections } from '../components/concert-detail-section-list/concert-detail-section-list.types';
import { useConcertDetailQuery } from './useConcertDetailQuery';

export const useConcertDetail = ({
  id,
  onPressTicketCta,
  onPressArtist,
  onPressVenueMap,
  onPressVenueProfile,
}: {
  id: string;
  onPressTicketCta?: () => void;
  onPressArtist?: (artistId: string) => void;
  onPressVenueMap?: () => void;
  onPressVenueProfile?: (venueId: string) => void;
}) => {
  const { data: eventData } = useConcertDetailQuery(id);
  const mainVenue = useMemo(() => {
    if (eventData.type !== 'concert') {
      return null;
    }
    return eventData.data.venues.at(0);
  }, [eventData.data.venues, eventData.type]);
  const thumbnails = useMemo(
    () => eventData?.data.posters.map((poster) => poster.url ?? ''),
    [eventData?.data.posters]
  );

  const sections: ConcertDetailSectionListSections = useMemo(() => {
    if (!eventData || eventData.type !== 'concert') {
      return [];
    }
    const { data: concertDetail } = eventData;
    const innerSections: ConcertDetailSectionListSections = [
      {
        title: 'title',
        data: [
          {
            title: concertDetail.title,
          },
        ],
      },
      {
        title: 'venue',
        sectionHeaderTitle: '공연 장소',
        data: [
          {
            location: mainVenue?.name ?? '',
          },
        ],
      },
      {
        title: 'date',
        sectionHeaderTitle: '공연 날짜',
        data: [
          {
            date: concertDetail.date ?? new Date().toISOString(),
            isKOPIS: concertDetail.isKOPIS,
          },
        ],
      },
      {
        title: 'tickets',
        sectionHeaderTitle: '티켓',
        data: [
          {
            tickets: concertDetail.tickets,
            onPressCta: onPressTicketCta,
          },
        ],
      },
      {
        title: 'about',
        sectionHeaderTitle: '소개',
        data:
          concertDetail.detailImages.length > 0
            ? [
                {
                  detailImages: concertDetail.detailImages,
                },
              ]
            : [],
      },
      {
        title: 'lineup',
        sectionHeaderTitle: '라인업',
        data: concertDetail.artists.map((artist) => ({
          thumbUrl: artist.thumbUrl ?? '',
          name: artist.name,
          artistId: artist.id,
          onPress: () => onPressArtist?.(artist.id),
        })),
      },
      {
        title: 'venue-map',
        sectionHeaderTitle: '공연 장소',
        data: [
          {
            latitude: mainVenue?.lat ?? 0.0,
            longitude: mainVenue?.lng ?? 0.0,
            address: mainVenue?.address ?? '',
            onPressMap: onPressVenueMap,
            venueId: mainVenue?.id ?? '',
            venueTitle: mainVenue?.name ?? '',
            onPressProfile: () => {
              if (!mainVenue?.id) {
                return;
              }
              onPressVenueProfile?.(mainVenue.id);
            },
          },
        ],
      },
    ];
    return innerSections;
  }, [
    eventData,
    mainVenue?.address,
    mainVenue?.id,
    mainVenue?.lat,
    mainVenue?.lng,
    mainVenue?.name,
    onPressArtist,
    onPressTicketCta,
    onPressVenueMap,
    onPressVenueProfile,
  ]);

  const tickets = useMemo(() => eventData.data.tickets, [eventData.data.tickets]);

  return {
    eventData,
    sections,
    thumbnails,
    mainVenue,
    tickets,
  };
};
