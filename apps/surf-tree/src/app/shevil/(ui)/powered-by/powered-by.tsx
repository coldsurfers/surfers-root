'use client';

import { Text } from '@coldsurfers/ocean-road';
import { StyledPoweredBy } from './powered-by.styled';

export const PoweredBy = () => {
  return (
    <StyledPoweredBy href="https://coldsurf.io">
      <img
        alt="favicon"
        src="/icons/favicon.ico"
        style={{ width: 25, height: 25, borderRadius: '50%', marginRight: '0.5rem' }}
      />
      <Text as="p" style={{ margin: 'unset' }}>
        Powered by COLDSURF
      </Text>
    </StyledPoweredBy>
  );
};
