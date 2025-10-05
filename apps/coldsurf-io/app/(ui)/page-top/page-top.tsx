'use client';

import { Button } from '@coldsurfers/ocean-road';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  StyledHomeMainTitle,
  StyledHomeMainTitleWrapper,
  StyledHomeSubTitle,
  StyledWrapper,
  TicketIcon,
  TopWrapper,
} from './page-top.styled';

const words = ['라이브 공연', '재즈 공연', '뮤지컬', '페스티벌', '연극', '콘서트', '클래식 공연'];
const duration = 2500;

export function PageTop() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const wordRef = useRef<HTMLSpanElement>(null);

  /**
   * words가 셔플되면서, 레이아웃 자체가 변할때에만 동작합니다.
   */
  useLayoutEffect(() => {
    if (wordRef.current) {
      setWidth(wordRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      /**
       * index의 순서대로 셔플
       */
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledWrapper>
      <TopWrapper>
        <TicketIcon strokeWidth={2} />
        <StyledHomeMainTitleWrapper>
          <StyledHomeMainTitle as="h1">
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={words[index]}
                ref={wordRef}
                initial={{ y: -40, opacity: 0, width: width }}
                animate={{ y: 0, opacity: 1, width: 'auto' }}
                exit={{ y: 40, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                style={{ whiteSpace: 'nowrap', display: 'inline-flex', marginRight: 12 }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </StyledHomeMainTitle>
          <StyledHomeMainTitle as="h1">{'찾고 계신가요?'}</StyledHomeMainTitle>
        </StyledHomeMainTitleWrapper>
      </TopWrapper>
      <StyledHomeSubTitle as="h3">{'내 근처의 티켓들, 당신을 위해 준비했어요'}</StyledHomeSubTitle>
      <Link href="/browse">
        <Button theme="border">티켓 찾기</Button>
      </Link>
    </StyledWrapper>
  );
}
