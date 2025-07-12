import { APP_HEADER_HEIGHT } from '@/shared/ui/constants';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;

export const ChildrenWrapper = styled.div`
  flex: 1;
  padding-top: ${APP_HEADER_HEIGHT};
`;
