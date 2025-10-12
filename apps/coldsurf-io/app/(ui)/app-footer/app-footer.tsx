'use client';

import { SNS_LINKS } from '@/libs/constants';
import { featureFlags } from '@/shared/constants';
import { BrandIcon } from '@/shared/ui/brand-icon';
import { GlobalLink } from '@/shared/ui/global-link/global-link';
import { SNSIcon } from '@/shared/ui/sns-icon';
import { Button, Text, media, semantics } from '@coldsurfers/ocean-road';
import { APP_STORE_URL } from '@coldsurfers/shared-utils';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { match } from 'ts-pattern';
import { APP_CONTAINER_MAX_WIDTH } from '../constants';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 15rem;
`;

const FooterTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
`;

const FooterBottomContainer = styled.div`
  max-width: ${APP_CONTAINER_MAX_WIDTH}px;
  min-width: ${APP_CONTAINER_MAX_WIDTH}px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  padding-top: 1.5rem;
  padding-bottom: 1.5rem;

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

const StyledAppStoreButton = styled(Button)`
  border-radius: 32px;
  background-color: ${semantics.color.background[1]};
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
`;

const StyledAppStoreLogo = styled(BrandIcon)`
  width: 1.25rem;
  height: 1.25rem;
  color: ${semantics.color.foreground[1]};
  fill: ${semantics.color.foreground[1]};
`;

const StyledAppStoreText = styled(Text)`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${semantics.color.foreground[1]};
  margin: unset;
`;

export function AppFooter() {
  return (
    <FooterContainer>
      <FooterTopContainer>
        <Link href={APP_STORE_URL} target="_blank" style={{ width: 'fit-content' }}>
          <StyledAppStoreButton>
            <StyledAppStoreLogo brand="apple" />
            <StyledAppStoreText as="p">iOS</StyledAppStoreText>
          </StyledAppStoreButton>
        </Link>
      </FooterTopContainer>
      <FooterBottomContainer>
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
      </FooterBottomContainer>
    </FooterContainer>
  );
}
