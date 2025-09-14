'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { StyledInfiniteHomeCollectionTitle } from './infinite-home-collection.styled';

export const InfiniteHomeCollectionTitle = ({ collectionTitle }: { collectionTitle: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <StyledInfiniteHomeCollectionTitle
      as="h2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {collectionTitle}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{
              opacity: 0,

              transform: 'translateX(-20%)',
            }}
            animate={{ opacity: 1, transform: 'translateX(0%)' }}
            exit={{ opacity: 0, transform: 'translateX(-20%)' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ChevronRight />
          </motion.span>
        )}
      </AnimatePresence>
    </StyledInfiniteHomeCollectionTitle>
  );
};
