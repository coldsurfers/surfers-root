import {
  COMMON_META_DESCRIPTION,
  COMMON_META_TITLE,
  GLOBAL_TIME_ZONE,
  SITE_URL,
} from '@/libs/constants';
import { apiClient } from '@/libs/openapi-client';
import { generateSlugHref } from '@/libs/utils/utils.slug';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import type { Metadata } from 'next/types';

export async function getEventMetadata(slug: string) {
  if (!slug) {
    return null;
  }
  try {
    const eventDetailData = await apiClient.event.getEventDetailBySlug(slug);
    if (!eventDetailData) {
      return null;
    }
    if (eventDetailData.type !== 'concert') {
      return null;
    }
    return {
      eventDetail: eventDetailData.data,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function generateEventDetailMetadata(eventDetailSlug: string) {
  const slug = decodeURIComponent(eventDetailSlug);
  const meta = await getEventMetadata(slug);
  if (!meta) {
    return {
      title: COMMON_META_TITLE,
      description: COMMON_META_DESCRIPTION,
    };
  }
  const { venues, artists, ticketPromotion, posters, title, date, tickets } = meta.eventDetail;

  const zonedDate = toZonedTime(new Date(date), GLOBAL_TIME_ZONE);
  const formattedDate = format(zonedDate, 'EEE, MMM d');
  const venueTitle = venues.at(0)?.name ?? '';
  const artistNamesString = artists.map((artist) => artist.name).join('\n');

  const metaTitle = `${title} - ${formattedDate}, ${venueTitle} | ${SERVICE_NAME} 공연 정보`;
  const metaDescription = `${formattedDate}에 ${venueTitle}에서 열리는 ${title}.\n\n출연: ${artistNamesString}\n\n${SERVICE_NAME}에서 공연 정보를 확인하고 티켓 구매처로 연결됩니다.`;

  const metaOther = {
    'product:brand': ticketPromotion?.sellerName ?? '',
    'product:availability': 'in stock',
    'product:condition': 'new',
    'product:price:amount': ticketPromotion?.price?.price ?? 0,
    'product:price:currency': ticketPromotion?.price?.currency ?? 'USD',
  };
  const metaKeywords = [
    venueTitle,
    ...artists.map((artist) => artist.name),
    title,
    ...tickets.map((ticket) => ticket.sellerName),
  ];
  const metaImages = posters.map((poster) => {
    return {
      alt: poster.url,
      url: poster.url,
    };
  });

  const openGraph: Metadata['openGraph'] = {
    type: 'website',
    title: metaTitle,
    description: metaDescription,
    images: metaImages,
    url: `${SITE_URL}${generateSlugHref(eventDetailSlug)}`,
  };

  return {
    // metadata for SEO
    title: metaTitle,
    description: metaDescription,
    other: metaOther,
    keywords: metaKeywords,
    openGraph,
    // additional event detail data
    eventDetailData: meta.eventDetail,
  };
}
