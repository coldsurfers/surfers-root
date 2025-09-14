'use client';

import { Button, TextArea } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { AnimatedForm } from './animated-form';

const StyledTextArea = styled(TextArea)`
  margin-top: 1.5rem;
  height: 200px;
`;
const StyledButton = styled(Button)`
  margin-top: 1.5rem;
`;

type Form = {
  message: string;
};

export const StoreRegistrationUserVoiceForm = () => {
  const { handleSubmit } = useForm<Form>();
  const onSubmit = (data: Form) => {
    console.log(data);
  };
  return (
    <AnimatedForm
      title="전하고 싶은 의견이 있으시면, 입력해주세요"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledTextArea noResize={false} placeholder="전하고 싶은 의견을 입력해주세요" />
      <StyledButton type="submit">제출</StyledButton>
    </AnimatedForm>
  );
};
