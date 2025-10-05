'use client';

import { AnimatedText } from '@/shared/ui';
import { Button, Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

const StyledHeader = styled(Text)`
  margin: unset;

  font-size: 2.5rem;

  color: ${semantics.color.foreground[1]};

  ${media.small(css`
    font-size: 2rem;
  `)}
`;

const StyledSubCopyText = styled(Text)`
  margin: unset;
  font-size: 1.35rem;

  font-weight: 550;

  color: ${semantics.color.foreground[3]};

  ${media.small(css`
    font-size: 1.15rem;
  `)}
`;

const StyledBodyText = styled(Text)`
  margin: unset;
  font-size: 1.25rem;

  color: ${semantics.color.foreground[2]};

  ${media.small(css`
    font-size: 1rem;
  `)}
`;

const Spacing = styled.div<{ height: number }>`
  height: ${({ height }) => height}rem;
`;

export const PromoteHeaderText = () => {
  return (
    <AnimatedText
      text={'곧 합법화되는 타투, 이제 예술의 이름으로 만나보세요'}
      renderComponent={(text) => <StyledHeader as="h1">{text}</StyledHeader>}
      delay={0.25}
      preset="opacityParagraph"
    />
  );
};

export const PromoteSubCopyText = () => {
  const textsToRender = [
    '대한민국 타투이스트법이 국회를 통과하며,\n이제 타투는 음지에서 벗어나 당당한 예술로 자리 잡게 됩니다',
    '\nCOLDSURF는 공연과 예술을 잇는 플랫폼으로서,\n타투 또한 그 연장선 위에 있다고 믿습니다',
    '\n우리는 아티스트와 팬을 연결하듯,\n타투이스트와 고객을 잇는 새로운 장을 준비하고 있습니다',
  ];
  return (
    <>
      <Spacing height={1} />
      {textsToRender.map((line, index) => (
        <Fragment key={index.toString()}>
          <Spacing height={0.5} />
          <AnimatedText
            text={line}
            delay={0.5}
            renderComponent={(text) => <StyledSubCopyText as="h2">{text}</StyledSubCopyText>}
            preset="opacityParagraph"
          />
        </Fragment>
      ))}
    </>
  );
};

export const PromoteBodyText = () => {
  const textsToRender = [
    'COLDSURF 타투 페이지에서는',
    '👩🏻‍🎤 믿을 수 있는 아티스트와의 연결',
    '🎨 개성 있는 디자인과 작품 아카이브',
    '🧼 합법화 시대에 맞는 위생·안전 정보 제공',
    '을 목표로 합니다',
    '지금은 시작 단계이지만,\n합법화가 시행되는 2년 뒤를 향해 함께 준비해 나가려 합니다',
  ];
  return (
    <>
      <Spacing height={1} />
      {textsToRender.map((text, index) => (
        <Fragment key={index.toString()}>
          <Spacing height={0.1} />
          <AnimatedText
            text={text}
            renderComponent={(text) => <StyledBodyText as="p">{text}</StyledBodyText>}
            delay={1.0}
            preset="opacityParagraph"
          />
        </Fragment>
      ))}
    </>
  );
};

const MotionButton = motion(Button);

export const PromoteActionText = () => {
  const router = useRouter();
  return (
    <>
      <Spacing height={1} />
      <AnimatedText
        text={'✍🏻 타투 아티스트이신가요?\nCOLDSURF와 함께 새로운 무대에 올라보세요'}
        preset="opacityParagraph"
        delay={1.5}
      />
      <Spacing height={0.75} />
      <MotionButton
        theme="border"
        initial={{ opacity: 0, translateY: '-20%' }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: '-20%' }}
        transition={{ duration: 0.5, delay: 1.5 }}
        onClick={() => router.push('/store/registration/contact')}
      >
        👉 [사전 등록 / 관심 등록]
      </MotionButton>
    </>
  );
};
