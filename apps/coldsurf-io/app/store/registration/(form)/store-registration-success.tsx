'use client';

import { GlobalLink } from '@/shared/ui';
import { AnimatedText } from '@/shared/ui';
import { AnimatedForm } from '@/shared/ui/animated-form';
import { Button } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';

const Spacing = styled.div`
  height: 1.25rem;
`;

export const StoreRegistrationSuccess = () => {
  return (
    <AnimatedForm
      title="신청해 주셔서 감사합니다."
      onSubmit={() => {
        //
      }}
      alignCenter
    >
      <Spacing />
      <AnimatedText
        text={
          '입력해주신 내용을 바탕으로 빠른 시일 내에 연락드릴게요.\n신청해주셔서 다시 한번 감사합니다.'
        }
      />
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
