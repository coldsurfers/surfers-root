'use client';

import { SNS_LINKS } from '@/libs/constants';
import { featureFlags } from '@/shared/constants';
import { GlobalLink } from '@/shared/ui/global-link/global-link';
import { SNSIcon } from '@/shared/ui/sns-icon';
import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { match } from 'ts-pattern';
import { APP_CONTAINER_MAX_WIDTH } from '../constants';

const Container = styled.footer`
  max-width: ${APP_CONTAINER_MAX_WIDTH}px;
  min-width: ${APP_CONTAINER_MAX_WIDTH}px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  margin-top: 15rem;
  padding-top: 1.5rem;
  padding-bottom: 15rem;

  border-top: 1px solid ${semantics.color.border[2]};

  ${media['xx-large'](css`
    margin-left: 1rem;
    margin-right: 1rem;
    min-width: unset;
  `)}

  ${media.medium(css`
    margin-top: 12.5rem;
    flex-direction: column;
    align-items: flex-start;
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

  ${media.medium(css`
    flex-direction: column;
    margin-left: unset;
    margin-top: 1.5rem;
  `)}
`;

const StyledSNSLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-left: 2.5rem;

  ${media.medium(css`
    margin-left: unset;
    margin-top: 1.5rem;
  `)}
`;

const StyledSNSIcon = styled(SNSIcon)`
  width: 1.5rem;
  height: 1.5rem;
  color: ${semantics.color.foreground[1]};
  fill: ${semantics.color.foreground[1]};
  cursor: pointer;

  ${media.medium(css`
    width: 1.25rem;
    height: 1.25rem;
  `)}
`;

const StyledSNSLogo = ({ social }: { social: 'instagram' | 'x' }) => {
  const href = match(social)
    .with('instagram', () => SNS_LINKS.INSTAGRAM)
    .with('x', () => SNS_LINKS.X)
    .exhaustive();

  return (
    <Link href={href} target="_blank">
      <StyledSNSIcon social={social} />
    </Link>
  );
};

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
      <StyledSNSLinksContainer>
        <StyledSNSLogo social="instagram" />
        <StyledSNSLogo social="x" />
      </StyledSNSLinksContainer>
    </Container>
  );
}
