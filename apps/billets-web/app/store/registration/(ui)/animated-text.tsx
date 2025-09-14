'use client';

import { Text } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const MotionText = motion(Text);
const StyledMotionText = styled(MotionText)`
 font-size: clamp(16px, 2vmin, 20px);
  font-weight: 418;
  letter-spacing: -0.02em;
  line-height: 1.25;
  margin: unset;
`;

const Line = styled.div`
  display: flex;
  align-items: center;
`;

const renderInnerText = (text: string) => {
  if (text === ' ') {
    return <div style={{ width: '0.25rem' }} />;
  }
  if (text === '\n') {
    return <br />;
  }
  return text;
};

export const AnimatedText = ({
  text,
  delay,
  onAnimateEnd,
}: { text: string; delay?: number; onAnimateEnd?: () => void }) => {
  const textSplitByNewLine = text.split('\n');
  return (
    <>
      {textSplitByNewLine.map((line, lineIndex) => (
        <Line key={line}>
          {line.split('').map((text, index) => {
            return (
              <StyledMotionText
                key={`${text}-${lineIndex}-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  index
                }`}
                as="p"
                style={{ display: 'flex', alignItems: 'center' }}
                initial={{ opacity: 0, translateY: '-20%', translateX: '-10%' }}
                animate={{ opacity: 1, translateY: 0, translateX: 0 }}
                exit={{ opacity: 0, translateY: '-20%', translateX: '-10%' }}
                transition={{
                  duration: 0.25,
                  ease: 'linear',
                  stiffness: 50,
                  type: 'spring',
                  delay: 0.025 * (lineIndex + index + 1) + (delay ?? 0),
                }}
                onAnimationComplete={() => {
                  const isLast =
                    lineIndex === textSplitByNewLine.length - 1 && index === line.length - 1;
                  if (isLast) {
                    onAnimateEnd?.();
                  }
                }}
              >
                {renderInnerText(text)}
              </StyledMotionText>
            );
          })}
        </Line>
      ))}
    </>
  );
};
