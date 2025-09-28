'use client';

import { Text, media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion, useIsPresent } from 'framer-motion';

const MotionText = motion(Text);
const StyledMotionText = styled(MotionText)`
  font-size: clamp(16px, 2vmin, 20px);
  font-weight: 418;
  letter-spacing: -0.02em;
  line-height: 1.25;
  margin: unset;

  ${media.small(css`
    font-size: 1rem;
  `)}
`;

const Line = styled.div`
  display: flex;
  align-items: center;

  flex-wrap: wrap;
`;

const renderInnerText = (text: string, renderComponent?: (text: string) => React.ReactNode) => {
  if (text === ' ') {
    return <div style={{ width: '0.25rem' }} />;
  }
  if (text === '\n') {
    return <br />;
  }
  return renderComponent ? renderComponent(text) : text;
};

const splitWithEmoji = (textString: string) =>
  [...new Intl.Segmenter().segment(textString)].map((x) => x.segment);

const getPreset = ({
  lineIndex,
  index,
  delay,
}: { lineIndex: number; index: number; delay: number }) =>
  ({
    progressiveChars: {
      duration: 0.25,
      ease: 'linear',
      stiffness: 50,
      type: 'spring',
      delay: 0.025 * (lineIndex + index + 1) + (delay ?? 0),
    },
    opacityParagraph: {
      duration: 0.25,
      ease: 'linear',
      stiffness: 50,
      type: 'spring',
      delay: delay ?? 0,
    },
  }) as const;

export const AnimatedText = ({
  text,
  delay,
  renderComponent,
  preset = 'progressiveChars',
}: {
  text: string;
  delay?: number;
  renderComponent?: (text: string) => React.ReactNode;
  preset?: keyof ReturnType<typeof getPreset>;
}) => {
  const textSplitByNewLine = text.split('\n');
  const isPresent = useIsPresent();

  if (!isPresent) {
    return null;
  }

  return (
    <>
      {textSplitByNewLine.map((line, lineIndex) => (
        <Line
          key={`${line}-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            lineIndex
          }`}
        >
          {splitWithEmoji(line).map((text, index) => {
            return (
              <StyledMotionText
                key={`${text}-${lineIndex}-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  index
                }`}
                as="span"
                style={{ display: 'flex', alignItems: 'center' }}
                initial={{ opacity: 0, translateY: '-20%', translateX: '-10%' }}
                animate={{ opacity: 1, translateY: 0, translateX: 0 }}
                exit={{ opacity: 0, translateY: '-20%', translateX: '-10%' }}
                transition={getPreset({ lineIndex, index, delay: delay ?? 0 })[preset]}
              >
                {renderInnerText(text, renderComponent)}
              </StyledMotionText>
            );
          })}
        </Line>
      ))}
    </>
  );
};
