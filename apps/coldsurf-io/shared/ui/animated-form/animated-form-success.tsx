'use client';

import { GlobalLink } from '@/shared/ui';
import { AnimatedText } from '@/shared/ui';
import { AnimatedForm } from '@/shared/ui/animated-form';
import { Button } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';

const Spacing = styled.div`
  height: 1.25rem;
`;

type Props = {
  title: string;
  message: string;
};

export const AnimatedFormSuccess = ({ title, message }: Props) => {
  return (
    <AnimatedForm
      title={title}
      onSubmit={() => {
        //
      }}
      alignCenter
    >
      <Spacing />
      <AnimatedText text={message} />
      <GlobalLink
        href="/"
        style={{
          width: 'fit-content',
          display: 'inline-block',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '1.5rem',
        }}
      >
        <Button theme="border">홈으로 이동하기</Button>
      </GlobalLink>
    </AnimatedForm>
  );
};
