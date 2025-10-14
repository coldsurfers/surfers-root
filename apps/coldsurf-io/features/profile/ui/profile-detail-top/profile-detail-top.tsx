'use client';

import { useIsLoggedIn } from '@/shared/lib';
import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { ImageModal } from 'app/(ui)';
import { Bolt } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { match } from 'ts-pattern';
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

const StyledSettingsIcon = styled(Bolt)`
  width: 24px;
  height: 24px;

  margin-left: 1rem;
  color: ${semantics.color.foreground[3]};

  cursor: pointer;
`;

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

  const { user } = useIsLoggedIn();

  const isMyProfile = useMemo(() => {
    return match(profileKind)
      .with('Artist', () => false)
      .with('User', () => user?.handle === title)
      .otherwise(() => false);
  }, [profileKind, title, user?.handle]);

  const openModal = useCallback(() => setIsModalOpen(true), []);

  const topText = useMemo(() => {
    if (profileKind === 'Artist') {
      return '아티스트';
    }
    return '문화창꼬';
  }, [profileKind]);

  return (
    <>
      <StyledArtistDetailTopContainer>
        <StyledArtistDetailTopLeft>
          <StyledArtistTopDescriptionWrapper>
            <StyledArtistTopSectionTitleText>{topText}</StyledArtistTopSectionTitleText>
            <StyledArtistNameText>
              {title}
              {isMyProfile && (
                <span>
                  <StyledSettingsIcon strokeWidth={2} />
                </span>
              )}
            </StyledArtistNameText>
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
