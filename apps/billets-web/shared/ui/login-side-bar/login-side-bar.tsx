'use client';

import { GLOBAL_Z_INDEX } from '@/libs/constants';
import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useLoginModalStore } from '../../store';

const Overlay = styled(motion.div)`
    z-index: ${GLOBAL_Z_INDEX.LOGIN_MODAL - 1};
    backdrop-filter: blur(0.5px);
    background: rgba(0, 0, 0, 0.45);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const ModalContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 512px;
    background-color: ${semantics.color.background[2]};
    z-index: ${GLOBAL_Z_INDEX.LOGIN_MODAL};
`;

export const LoginSideBar = () => {
  const isVisible = useLoginModalStore((state) => state.isVisible);
  const close = useLoginModalStore((state) => state.close);

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
            initial={{
              right: '-512px',
            }}
            animate={{
              right: '0px',
            }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
          >
            Hello Login Modal
          </ModalContainer>
        </>
      )}
    </AnimatePresence>
  );
};
