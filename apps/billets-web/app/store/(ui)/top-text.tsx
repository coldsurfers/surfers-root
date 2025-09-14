'use client';

import { Button } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedText } from './animated-text';

const Spacing = styled.div`
  height: 2rem;
`;

export const TopText = () => {
  const [step, setStep] = useState(1);
  return (
    <AnimatePresence>
      <AnimatedText
        text={
          '안녕하세요, COLDSURF 입니다.\n현재 저희는 다음 서비스로써, 입점 서비스를 제공하려고 계획중이에요.'
        }
        onAnimateEnd={() => setStep(2)}
      />
      <Spacing />
      {step >= 2 && (
        <AnimatedText
          text={
            '입점하게 되면, 공연장에서 제공하는 공연 정보를 바탕으로 고객분들께 홍보를 할 수 있어요.\n또한, 각 공연장에서 필요한 정보를 수집하여 관리하는 대시보드를 준비하고 있어요.'
          }
          onAnimateEnd={() => setStep(3)}
        />
      )}
      <Spacing />
      {step >= 3 && (
        <AnimatedText
          text={
            '현재는 아무런 조건 없이 베타 테스트를 운영중이므로,\n입점하시고 싶으시다면 아래 버튼을 눌러주세요!'
          }
          onAnimateEnd={() => setStep(4)}
        />
      )}
      <Spacing />
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, translateY: '-20%' }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: '-20%' }}
          transition={{ duration: 0.5 }}
        >
          <Button>입점 신청하기</Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
