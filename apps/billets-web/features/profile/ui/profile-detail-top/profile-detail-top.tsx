'use client';

import { ImageModal } from 'app/(ui)';
import { useCallback, useState } from 'react';
import {
  StyledArtistDetailTopContainer,
  StyledArtistDetailTopLeft,
  StyledArtistDetailTopRight,
  StyledArtistNameText,
  StyledArtistThumbnail,
  StyledArtistThumbnailWrapper,
  StyledArtistTopDescriptionWrapper,
  StyledArtistTopSectionTitleText,
  StyledContentWrapper,
  StyledInfoIcon,
} from './profile-detail-top.styled';

type Props = {
  profileKind: 'Artist' | 'User';
  title: string;
  thumbUrl?: string;
  imgModalThumbUrl?: string;
  thumbCopyright?: {
    id: string;
    license: string;
    licenseURL: string;
    owner: string;
  };
};

export function ProfileDetailTop({
  profileKind,
  title,
  thumbUrl,
  imgModalThumbUrl,
  thumbCopyright,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  return (
    <>
      <StyledArtistDetailTopContainer>
        <StyledArtistDetailTopLeft>
          <StyledArtistTopDescriptionWrapper>
            <StyledArtistTopSectionTitleText>{profileKind}</StyledArtistTopSectionTitleText>
            <StyledArtistNameText>{title}</StyledArtistNameText>
          </StyledArtistTopDescriptionWrapper>
        </StyledArtistDetailTopLeft>
        <StyledArtistDetailTopRight>
          {thumbUrl && (
            <StyledArtistThumbnailWrapper>
              <StyledContentWrapper>
                <StyledArtistThumbnail src={thumbUrl} onClick={openModal} />
                <StyledInfoIcon onClick={openModal} />
              </StyledContentWrapper>
            </StyledArtistThumbnailWrapper>
          )}
        </StyledArtistDetailTopRight>
      </StyledArtistDetailTopContainer>
      <ImageModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={imgModalThumbUrl ?? ''}
        copyright={thumbCopyright}
      />
    </>
  );
}
