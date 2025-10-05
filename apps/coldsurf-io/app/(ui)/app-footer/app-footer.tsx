'use client';

import { GlobalLink } from '@/shared/ui/global-link/global-link';
import { Text, media, semantics } from '@coldsurfers/ocean-road';
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

const FooterText = styled(Text)`
  margin: unset;
  color: ${semantics.color.foreground[1]};
`;

export function AppFooter() {
  return (
    <Container>
      <Text as="p" style={{ fontWeight: 'bold', margin: 'unset' }}>
        &copy; 2025 COLDSURF, Inc.
      </Text>
      <GlobalLink href="/privacy-policy">
        <FooterText as="p">Privacy Policy</FooterText>
      </GlobalLink>
      <GlobalLink href="/terms-of-service">
        <FooterText as="p">Terms of Service</FooterText>
      </GlobalLink>
      <GlobalLink href="/about/products">
        <FooterText as="p">Products</FooterText>
      </GlobalLink>
    </Container>
  );
}
