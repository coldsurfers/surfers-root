'use client';

import { GlobalLink } from '@/shared/ui/global-link/global-link';
import { Button, Text, media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
const Container = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-top: 15rem;

  ${media.large(css`
    padding-left: 1rem;
    padding-right: 1rem;
  `)}

  ${media.medium(css`
    margin-top: 12.5rem;
  `)}
`;

export function AppFooter() {
  return (
    <Container>
      <Text as="p" style={{ fontWeight: 'bold', margin: 'unset' }}>
        &copy; 2025 COLDSURF, Inc.
      </Text>
      <GlobalLink href="/privacy-policy">
        <Text as="p" style={{ margin: 'unset' }}>
          Privacy Policy
        </Text>
      </GlobalLink>
      <GlobalLink href="/terms-of-service">
        <Text as="p" style={{ margin: 'unset' }}>
          Terms of Service
        </Text>
      </GlobalLink>
      <GlobalLink href="/about/products">
        <Text as="p" style={{ margin: 'unset' }}>
          Products
        </Text>
      </GlobalLink>
    </Container>
  );
}
