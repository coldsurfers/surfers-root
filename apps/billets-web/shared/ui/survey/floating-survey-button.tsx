'use client';

import { media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { SurveyForm } from './survey-form';

const FloatingButtonContainer = styled.div`
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background-color: ${semantics.color.background[4]};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    background-image: url('/logo.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    margin-left: auto;

    ${media.medium(css`
        width: 3.5rem;
        height: 3.5rem;
    `)}

    ${media.small(css`
        width: 3rem;
        height: 3rem;
    `)}
`;

const FixedLayout = styled.div`
    position: fixed;
    bottom: 1rem;
    right: 1rem;

    display: flex;
    flex-direction: column-reverse;

    ${media.medium(css`
        bottom: 0.5rem;
        right: 0.5rem;
    `)}

    ${media.small(css`
        bottom: 0.5rem;
        right: 0.5rem;
    `)}
`;

const FloatingButtonComponent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <FloatingButtonContainer ref={ref} {...props} />
);

const FloatingButton = motion.create(FloatingButtonComponent);

type Props = {
  onClick?: () => void;
};

export const FloatingSurveyButton = ({ onClick }: Props) => {
  const [isSurveyFormOpen, setIsSurveyFormOpen] = useState(false);
  const floatingButtonRef = useRef<HTMLDivElement>(null);
  const surveyFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!surveyFormRef.current || !floatingButtonRef.current) return;
      if (
        surveyFormRef.current.contains(e.target as Node) ||
        floatingButtonRef.current.contains(e.target as Node)
      ) {
        return;
      }
      setIsSurveyFormOpen(false);
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <FixedLayout>
      <FloatingButton
        ref={floatingButtonRef}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        }}
        whileFocus={{
          scale: 1.1,
          boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        }}
        whileTap={{
          scale: 1.1,
          boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
        }}
        onClick={() => {
          setIsSurveyFormOpen(true);
          onClick?.();
        }}
      />
      <AnimatePresence>{isSurveyFormOpen && <SurveyForm ref={surveyFormRef} />}</AnimatePresence>
    </FixedLayout>
  );
};
