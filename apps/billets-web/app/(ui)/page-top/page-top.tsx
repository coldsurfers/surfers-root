'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { StyledHomeMainTitle, StyledWrapper, TicketIcon, TopWrapper } from './page-top.styled'

const words = ['라이브 공연', '재즈 공연', '뮤지컬', '페스티벌', '연극', '콘서트', '클래식']
const duration = 3000

export function PageTop() {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const wordRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    if (wordRef.current) {
      setWidth(wordRef.current.offsetWidth)
    }
  }, [index])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, duration)
    return () => clearInterval(interval)
  }, [])

  return (
    <StyledWrapper>
      <TopWrapper>
        <TicketIcon strokeWidth={2} />
        <StyledHomeMainTitle as="h1" style={{ display: 'flex', alignItems: 'center', height: 48, overflow: 'hidden' }}>
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
              style={{ whiteSpace: 'nowrap', display: 'inline-flex' }}
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
          <span style={{ marginLeft: 8 }}>{'티켓, 찾고 계신가요?'}</span>
        </StyledHomeMainTitle>
      </TopWrapper>
      <StyledHomeMainTitle as="h2">{'공연 티켓을 찾기 어려운 당신을 위해 준비했어요'}</StyledHomeMainTitle>
    </StyledWrapper>
  )
}
