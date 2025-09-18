'use client';

import { Button } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedText } from './animated-text';

const Spacing = styled.div`
  height: 2rem;
`;

export const PageContent = () => {
  return (
    <AnimatePresence>
      <AnimatedText
        text={
          '안녕하세요, COLDSURF 입니다.\n현재 저희는 다음 서비스로써, 입점 서비스를 제공하려고 계획중이에요.'
        }
      />
      <Spacing />
      <AnimatedText
        text={
          '먼저 수요를 받고 수요자 분들의 니즈에 맞추어 개발해 나갈 예정이에요.\n또한, 필요시 정보를 수집하여 관리하는 대시보드도 염두해두고 있어요.'
        }
        delay={0.25}
      />
      <Spacing />
      <AnimatedText
        text={
          '현재는 아무런 조건 없이 베타 테스트를 운영중이므로,\n입점하시고 싶으시다면 부담없이 연락주세요!'
        }
        delay={0.5}
      />
      <Spacing />
      <motion.div
        initial={{ opacity: 0, translateY: '-20%' }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: '-20%' }}
        transition={{ duration: 0.5, delay: 0.75 }}
      >
        <Link href="mailto:imcoldsurf@gmail.com">
          <Button>입점 신청 메일보내기</Button>
        </Link>
      </motion.div>
      <Spacing />
      <AnimatedText text={'또는, imcoldsurf@gmail.com 으로 메일을 보내주세요.'} delay={1} />
    </AnimatePresence>
  );
};
