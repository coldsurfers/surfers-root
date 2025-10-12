'use client';

import { featureFlags } from '@/shared/constants';
import { GlobalLink } from '@/shared/ui/global-link/global-link';
import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { APP_CONTAINER_MAX_WIDTH } from '../constants';

const Container = styled.div`
  width: 100%;
  max-width: ${APP_CONTAINER_MAX_WIDTH}px;
  margin: 0 auto;
  height: 15rem;
  display: flex;
  flex-direction: row;
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

const StyledLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-left: auto;
`;

export function AppFooter() {
  return (
    <Container>
      <Text as="p" style={{ fontWeight: 'bold', margin: 'unset' }}>
        &copy; 2025 COLDSURF, Inc.
      </Text>
      <StyledLinksContainer>
        <GlobalLink href="/privacy-policy">
          <FooterText as="p">개인정보 처리방침</FooterText>
        </GlobalLink>
        <GlobalLink href="/terms-of-service">
          <FooterText as="p">이용약관</FooterText>
        </GlobalLink>
        {featureFlags.useProductsPageFeature && (
          <GlobalLink href="/about/products">
            <FooterText as="p">Products</FooterText>
          </GlobalLink>
        )}
        <GlobalLink href="/blog">
          <FooterText as="p">주인장의 소회</FooterText>
        </GlobalLink>
      </StyledLinksContainer>
    </Container>
  );
}
