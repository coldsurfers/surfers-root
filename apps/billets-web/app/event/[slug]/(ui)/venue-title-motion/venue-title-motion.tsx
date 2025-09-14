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
      initial={{
        color: semantics.color.foreground[1],
      }}
    >
      {text}
    </MotionComponent>
  );
};
