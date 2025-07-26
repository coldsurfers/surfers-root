'use client';

import { logEvent } from '@/features/firebase/firebase';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import { type ReactNode, useEffect } from 'react';
import {
  StyledPageLayout,
  StyledPosterContainer,
  StyledRightSideContainer,
  StyledSectionContainer,
  StyledSectionHeaderText,
  StyledTicketCTAContainer,
  StyledTopInfoContainer,
} from './page-layout.styled';

export function PageLayout({
  poster,
  topInfo,
  ticketCTA,
  about,
  lineup,
  venue,
  downloadApp,
  eventId,
}: {
  poster: ReactNode;
  topInfo: ReactNode;
  ticketCTA: ReactNode;
  about: ReactNode | null;
  lineup: ReactNode | null;
  venue: ReactNode;
  downloadApp: ReactNode;
  eventId: string;
}) {
  useEffect(() => {
    logEvent({
      name: 'visit_event_detail',
      params: {
        event_id: eventId,
      },
    });
  }, [eventId]);

  return (
    <StyledPageLayout>
      <StyledPosterContainer>{poster}</StyledPosterContainer>
      <StyledRightSideContainer>
        <StyledTopInfoContainer>{topInfo}</StyledTopInfoContainer>
        <StyledTicketCTAContainer>{ticketCTA}</StyledTicketCTAContainer>
        {about && (
          <StyledSectionContainer>
            <StyledSectionHeaderText as="h3">About</StyledSectionHeaderText>
            {about}
          </StyledSectionContainer>
        )}
        {lineup && (
          <StyledSectionContainer>
            <StyledSectionHeaderText as="h3">Lineup</StyledSectionHeaderText>
            {lineup}
          </StyledSectionContainer>
        )}
        <StyledSectionContainer>
          <StyledSectionHeaderText as="h3">Venue</StyledSectionHeaderText>
          {venue}
        </StyledSectionContainer>
        <StyledSectionContainer>
          <StyledSectionHeaderText as="h3">Download the {SERVICE_NAME} app</StyledSectionHeaderText>
          {downloadApp}
        </StyledSectionContainer>
      </StyledRightSideContainer>
    </StyledPageLayout>
  );
}
