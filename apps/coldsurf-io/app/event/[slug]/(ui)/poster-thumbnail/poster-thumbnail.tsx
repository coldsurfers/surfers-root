'use client';

import { FixedSubscribeEventButtonLayout, SubscribeEventButton } from '@/features/subscribe';
import { isEmptySource } from '@/libs/utils/utils.image';
import { featureFlags } from '@/shared/constants';
import type { components } from '@coldsurfers/api-sdk';
import { ImageModal } from 'app/(ui)';
import { type ReactNode, useMemo, useState } from 'react';
import {
  StyledContentWrapper,
  StyledPosterThumbnail,
  StyledPosterThumbnailEmpty,
  StyledPosterThumbnailEmptyText,
  StyledShareButtonsAccessoryLayout,
} from './poster-thumbnail.styled';

type PosterThumbnailProps = {
  src: string;
  alt?: string;
  copyright?: components['schemas']['CopyrightDTOSchema'];
  eventId: string;
  shareButtonsAccessory?: ReactNode;
};

export function PosterThumbnail({
  src,
  alt,
  copyright,
  eventId,
  shareButtonsAccessory,
}: PosterThumbnailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const source = useMemo(() => {
    if (isEmptySource(src)) return '';
    return `${src}`;
  }, [src]);
  const imageModalSource = useMemo(() => {
    if (isEmptySource(src)) return '';
    return `${src}`;
  }, [src]);
  return source ? (
    <>
      <StyledContentWrapper>
        <StyledPosterThumbnail src={source} alt={alt} />
        {featureFlags.useSubscribeButton && (
          <FixedSubscribeEventButtonLayout customBottom={12}>
            <SubscribeEventButton eventId={eventId} />
          </FixedSubscribeEventButtonLayout>
        )}
      </StyledContentWrapper>
      <StyledShareButtonsAccessoryLayout>{shareButtonsAccessory}</StyledShareButtonsAccessoryLayout>
      <ImageModal
        visible={isModalOpen}
        src={imageModalSource}
        onClose={() => setIsModalOpen(false)}
        copyright={copyright}
      />
    </>
  ) : (
    <StyledPosterThumbnailEmpty>
      <StyledPosterThumbnailEmptyText>{alt}</StyledPosterThumbnailEmptyText>
    </StyledPosterThumbnailEmpty>
  );
}
