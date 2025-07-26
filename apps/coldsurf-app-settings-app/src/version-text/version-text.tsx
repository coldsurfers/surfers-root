import { Text } from '@coldsurfers/ocean-road/native';
import styled from '@emotion/native';
import type { VersionTextProps } from '../types';

export const StyledVersionText = styled(Text)`
  font-size: 12px;
  margin-left: 46px;
  margin-top: 12px;
`;

export const VersionText = (props: VersionTextProps) => {
  return <StyledVersionText {...props} />;
};
