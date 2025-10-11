'use client';

import { AnimatedText } from '@/shared/ui';
import { Text, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';

const StyledWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimatedMessageText = styled(Text)`
  font-size: 1.45rem;
  line-height: 1.25;
  font-weight: 550;
  color: ${semantics.color.foreground[1]};
  margin: unset;
`;

const AnimatedProfileText = styled(Text)`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${semantics.color.foreground[3]};
  margin: unset;
  margin-top: 0.5rem;
`;

const text =
  '“ 다방면 문화 예술 서포트 플랫폼 COLDSURF는\n문화 예술 업계 종사자분들의 이야기를 듣고,\n함께 해결해나가는 파트너가 되고 싶어요.\n또한 서로의 상생을 위한 건강한 협업 문화를 만들고 싶습니다.\n업계 종사자 분들의 이야기를 듣고, 도움을 드릴 수 있도록\n아래의 폼을 활용하여 여러분의 이야기를 들려주세요! “';

export const PartnersIntro = () => {
  return (
    <StyledWrapper>
      <AnimatePresence>
        <AnimatedText
          text={text}
          renderComponent={(text) => <AnimatedMessageText as="p">{text}</AnimatedMessageText>}
        />
        <AnimatedText
          text={'from COLDSURF, Paul'}
          renderComponent={(text) => <AnimatedProfileText as="p">{text}</AnimatedProfileText>}
          delay={0.25}
        />
      </AnimatePresence>
    </StyledWrapper>
  );
};
