'use client';

import { breakpoints } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { Header } from './header';
import { MobileMenu } from './mobile-menu';

const ChildContainer = styled.div`
  padding-top: 100px;
`;

export const AboutPageLayout = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > breakpoints.large) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <Header
        onClickMenuIcon={() => setIsOpen(true)}
        isMobileMenuOpen={isOpen}
        onClickCloseMobileMenuIcon={() => setIsOpen(false)}
      />
      <MobileMenu isOpen={isOpen} onClickMenuItem={() => setIsOpen(false)} />
      <ChildContainer>{children}</ChildContainer>
    </>
  );
};
