'use client';

import { Button, Text } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const StyledFormNav = styled(motion.div)`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 430px;
  left: -14px;
  position: relative;
`;

export const FormNav = () => {
  const router = useRouter();
  return (
    <StyledFormNav
      initial={{ opacity: 0, translateX: '-10%' }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: '-10%' }}
      transition={{ duration: 0.125, type: 'spring', stiffness: 100 }}
    >
      <Button theme="transparent" onClick={() => router.back()}>
        <Text style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={18} />
          </span>
          이전
        </Text>
      </Button>
    </StyledFormNav>
  );
};
