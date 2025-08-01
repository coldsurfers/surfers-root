'use client';

import { GoogleLoginButton } from '@/features/auth';
import { COMMON_META_DESCRIPTION, COMMON_META_TITLE, GLOBAL_Z_INDEX } from '@/libs/constants';
import { useIsMobile, usePreventScrollEffect } from '@/shared/lib';
import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLoginModalStore } from '../../store';

const Overlay = styled(motion.div)`
    z-index: ${GLOBAL_Z_INDEX.LOGIN_MODAL - 1};
    backdrop-filter: blur(0.5px);
    background: rgba(0, 0, 0, 0.45);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const ModalContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 512px;
    background-color: ${semantics.color.background[2]};
    z-index: ${GLOBAL_Z_INDEX.LOGIN_MODAL};

    padding: 2.5rem;

    display: flex;
    flex-direction: column;

    align-items: center;

    ${media.medium(css`
        position: fixed;
        top: unset;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 512px;
    `)}
`;

const Title = styled(Text)`
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
`;
const SubTitle = styled(Text)`
    margin: unset;
    margin-top: 0.75rem;
    margin-bottom: 1rem;
    text-align: center;
`;

export const LoginSideBar = () => {
  const isVisible = useLoginModalStore((state) => state.isVisible);
  const close = useLoginModalStore((state) => state.close);

  const isMobile = useIsMobile();

  usePreventScrollEffect({
    shouldPrevent: isVisible,
  });

  return (
    <AnimatePresence onExitComplete={() => close()}>
      {isVisible && (
        <>
          <Overlay
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            onClick={() => close()}
          />
          <ModalContainer
            initial={
              isMobile
                ? {
                    bottom: '-512px',
                  }
                : {
                    right: '-512px',
                  }
            }
            animate={
              isMobile
                ? {
                    bottom: '0px',
                  }
                : {
                    right: '0px',
                  }
            }
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
          >
            <div
              onClick={() => close()}
              onKeyDown={() => close()}
              style={{
                padding: '0.5rem',
                cursor: 'pointer',
                marginLeft: 'auto',
              }}
            >
              <X color={semantics.color.foreground[1]} />
            </div>
            <Title as="h1">Log in / Sign up</Title>
            <SubTitle as="h2">{COMMON_META_TITLE}</SubTitle>
            <SubTitle as="h3">{COMMON_META_DESCRIPTION}</SubTitle>
            <GoogleLoginButton />
          </ModalContainer>
        </>
      )}
    </AnimatePresence>
  );
};
