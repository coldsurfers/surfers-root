'use client';

import { colors, semantics } from '@coldsurfers/ocean-road';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const MotionComponent = motion.span;

export const VenueTitleMotion = ({ text }: { text: ReactNode }) => {
  return (
    <MotionComponent
      whileHover={{
        transition: { duration: 0.2, ease: 'easeInOut' },
        color: colors.oc.cyan[8].value,
      }}
      whileFocus={{
        transition: { duration: 0.2, ease: 'easeInOut' },
        color: colors.oc.cyan[8].value,
      }}
      whileTap={{
        transition: { duration: 0.2, ease: 'easeInOut' },
        color: colors.oc.cyan[8].value,
      }}
      transition={{
        duration: 0.2,
        ease: 'easeInOut',
      }}
      initial={{
        color: semantics.color.foreground[1],
        display: 'contents',
      }}
    >
      {text}
    </MotionComponent>
  );
};
