import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledPostItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledPostSubContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 12rem;

  ${media.medium(css`
    margin-left: auto;
    width: 10rem;
  `)}
`;

export const StyledPostItemDateLocale = styled(Text)`
  opacity: 0.65;
  margin: unset;
  ${media.medium(css`
    font-size: 14px;
  `)}
`;

export const StyledPostItemPostTitleContainer = styled.div`
  flex: 1;
  margin: 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-right: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  a {
    color: inherit;
  }

  ${media.medium(css`
    margin-right: unset;
    width: 100%;
  `)}
`;

export const StyledPostItemTitleText = styled(Text)`
  font-size: 18px;
  font-weight: 500;

  margin: unset;

  ${media.medium(css`
    font-size: 16px;
    margin-right: 16px;
  `)}
`;

export const StyledPostItemWriterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`;

export const StyledPostItemWriterText = styled(Text)`
  margin: unset;
  ${media.medium(css`
    font-size: 14px;
  `)}
`;
export const StyledPostItemWriterAvatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const StyledPostThumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 16px;
  max-width: 100%;
  height: auto;
`;

export const StyledPostPlatformText = styled(Text)`
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  font-size: 18px;

  color: ${semantics.color.foreground[4]};

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledPostTitleText = styled(Text)`
  margin: unset;
  margin-bottom: 0.5rem;
  display: inline-block;
  width: 100%;
  max-width: 100%;

  color: ${semantics.color.foreground[1]};

  span {
    display: inline-block;
    word-wrap: break-word; /* Ensures long words break */
    word-break: break-word; /* Alternative for modern browsers */
    overflow-wrap: break-word; /* Standard, preferred */
    white-space: normal; /* Allows wrapping */

    &:hover {
      text-decoration: underline;
    }

    ${media.large(css`
      font-size: 20px;
    `)}
  }
`;

export const StyledPostDateText = styled(Text)`
  margin: unset;
  margin-bottom: 1rem;
  font-size: 14px;
  color: ${semantics.color.foreground[4]};
`;
