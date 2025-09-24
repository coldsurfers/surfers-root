'use client';

import { Button, Text, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { AnimatedText } from 'app/store/registration/(ui)/animated-text';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Container = styled.div`
  width: auto;
  height: auto;
  background-color: ${semantics.color.background[3]};
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin-bottom: 1rem;
`;

const StyledAnimTitle = styled(Text)`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${semantics.color.foreground[1]};
`;

const StyledAnimText = styled(Text)`
  font-size: 1.05rem;
  color: ${semantics.color.foreground[1]};
`;

const ContainerComponent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <Container ref={ref} {...props} />
);

const MotionContainer = motion.create(ContainerComponent);

export const SurveyForm = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <MotionContainer
      ref={ref}
      initial={{ opacity: 0, translateY: '2%' }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: '2%' }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      key="survey-form"
    >
      <AnimatedText
        text="COLDSURF, 잘 쓰고 계신가요?"
        as="h3"
        renderComponent={(text) => <StyledAnimTitle>{text}</StyledAnimTitle>}
      />
      <div style={{ height: '1rem' }} />
      <AnimatedText
        text="안녕하세요, COLDSURF의 메이커 Paul입니다"
        as="p"
        renderComponent={(text) => <StyledAnimText>{text}</StyledAnimText>}
        delay={0.65}
      />
      <div style={{ height: '0.5rem' }} />
      <AnimatedText
        text={
          'COLDSURF를 이용해주시는 여러분께\n몇 가지 궁금한점이 있어서 이렇게 찾아뵙게 되었어요'
        }
        as="p"
        renderComponent={(text) => <StyledAnimText>{text}</StyledAnimText>}
        delay={0.85}
      />
      <div style={{ height: '0.5rem' }} />
      <AnimatedText
        text={'잠깐만 시간을 내주시면, 많은 부분을 채워드릴 수 있을 거예요'}
        as="p"
        renderComponent={(text) => <StyledAnimText>{text}</StyledAnimText>}
        delay={0.95}
      />
      <div style={{ height: '0.75rem' }} />
      <AnimatedText
        text="그럼 이제 질문을 시작할게요!"
        as="p"
        renderComponent={(text) => <StyledAnimText>{text}</StyledAnimText>}
        delay={1.05}
      />
      <div style={{ height: '0.75rem' }} />
      <Button theme="border">답변하기</Button>
    </MotionContainer>
  );
});
