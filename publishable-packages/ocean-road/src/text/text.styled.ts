import styled from '@emotion/styled';

export const StyledTextContainer = styled.span<{ numberOfLines?: number }>`
  white-space: pre-wrap;
  line-height: 1.25;

  ${({ numberOfLines }) =>
    numberOfLines &&
    `
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${numberOfLines};
  -webkit-box-orient: vertical;
  word-break: break-all;
  `}
`;
