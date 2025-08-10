'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { apiClient } from '@/libs/openapi-client';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { SLICK_SLIDE_INTER_SPACE, SLICK_SLIDE_INTER_SPACE_LARGE } from 'app/(ui)/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import Slider from 'react-slick';
import { match } from 'ts-pattern';
import { RecentConcertListItem } from '../recent-concert-list/recent-concert-list-item';
import { StyledRecentListTitle } from '../recent-concert-list/recent-concert-list.styled';

const Wrapper = styled.div`
    & > .slick-slider > .slick-list > .slick-track {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .slick-slide + .slick-slide {
      margin-left: ${SLICK_SLIDE_INTER_SPACE}px;
      :nth-of-type(4n + 1) {
        margin-left: 0px;
      }

      ${media.large(css`
          margin-left: ${SLICK_SLIDE_INTER_SPACE_LARGE}px;
          :nth-of-type(4n + 1) {
            margin-left: 0px;
          }
      `)}

      ${media.small(css`
        :nth-of-type(4n + 1) {
          margin-left: ${SLICK_SLIDE_INTER_SPACE_LARGE}px;
        }
        :nth-of-type(3n + 1) {
          margin-left: 0px;
        }
      `)}
    }

    .slick-track {
      display: flex !important;
    }

    .slick-prev {
      left: -48px;
      width: 48px;
      background: ${semantics.color.background[2]};
      height: 100%;
      z-index: 100;
      opacity: 0.5;

      border-radius: 8px;

      &:hover {
        background: ${semantics.color.background[1]};
      }

      ${media['xx-large'](css`
        left: -36px;
        width: 36px;
      `)}

      ${media.large(css`
        left: -20px;
        width: 20px;
      `)}
    }

    .slick-next {
      right: -48px;
      width: 48px;
      background: ${semantics.color.background[2]};
      height: 100%;
      z-index: 100;
      opacity: 0.5;

      border-radius: 4px;

      &:hover {
        background: ${semantics.color.background[1]};
      }

      ${media['xx-large'](css`
        right: -36px;
        width: 36px;
      `)}

      ${media.large(css`
        right: -20px;
        width: 20px;
      `)}
    }
`;

type Props = {
  slug: string;
  col?: number;
};

type DataT = Awaited<ReturnType<typeof apiClient.venue.getVenueDetailBySlug>>;
type MutableDataT = {
  name: string;
  upcomingEvents: (DataT['upcomingEvents'][number] | { type: 'empty' })[];
};

export const VenueWithMemoEventList = ({ slug, col = 4 }: Props) => {
  const { data } = useQuery<DataT, OpenApiError, MutableDataT>({
    queryKey: ['venue-with-memo', 'venue-detail-by-slug', slug, col],
    queryFn: async () => {
      return await apiClient.venue.getVenueDetailBySlug(slug);
    },
    select: (data) => {
      const newUpcomingEvents = data.upcomingEvents ?? [];
      if (newUpcomingEvents.length % col !== 0) {
        newUpcomingEvents.push(
          ...Array(col - (newUpcomingEvents.length % col)).fill({ type: 'empty' })
        );
      }
      return { name: data.name, upcomingEvents: newUpcomingEvents };
    },
  });

  const uiData = useMemo(() => {
    const events = data?.upcomingEvents ?? [];
    if (events.length === 0) {
      return null;
    }
    return {
      events,
      name: data?.name ?? '',
    };
  }, [data?.upcomingEvents, data?.name]);

  if (!uiData) {
    return null;
  }

  return (
    <>
      <StyledRecentListTitle as="h2">{uiData.name}</StyledRecentListTitle>
      <Wrapper>
        <Slider
          infinite={false}
          speed={500}
          centerMode={false}
          initialSlide={0}
          draggable={false}
          prevArrow={<ChevronLeft color={semantics.color.foreground[1]} />}
          nextArrow={<ChevronRight color={semantics.color.foreground[1]} />}
          slidesToShow={col}
          slidesToScroll={col}
        >
          {uiData.events.map((value) => {
            return match(value)
              .with({ type: 'concert' }, (value) => {
                return <RecentConcertListItem data={value.data} key={value.data.id} />;
              })
              .with({ type: 'empty' }, (value) => {
                return <RecentConcertListItem.Empty key={value.type} />;
              })
              .otherwise(() => null);
          })}
        </Slider>
      </Wrapper>
    </>
  );
};
