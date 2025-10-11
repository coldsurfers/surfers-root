'use client';

import styled from '@emotion/styled';
import { type ReactNode, useEffect } from 'react';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    max-width: 625px;
    margin: 0 auto;
`;

const EachContent = styled.div`
    width: 100%;
`;

type Props = {
  topContent: ReactNode;
  bottomContent: ReactNode;
};

export const PartnersPageLayout = ({ topContent, bottomContent }: Props) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <Layout>
      <EachContent>{topContent}</EachContent>
      <EachContent>{bottomContent}</EachContent>
    </Layout>
  );
};
