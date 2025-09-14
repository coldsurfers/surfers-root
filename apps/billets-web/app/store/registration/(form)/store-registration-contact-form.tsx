'use client';

import { Button, Text, TextInput } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AnimatedForm } from './animated-form';

const StyledLabel = styled(Text)`
  margin-top: 20px;
  margin-bottom: 10px;
`;
const StyledButton = styled(Button)`
  margin-top: 20px;
`;

type Form = {
  email: string;
  phone: string;
};

export const StoreRegistrationContactForm = () => {
  const { register, handleSubmit } = useForm<Form>();
  const router = useRouter();

  const onSubmit = (data: Form) => {
    console.log(data);
    router.push('/store/registration/user-voice');
  };

  return (
    <AnimatedForm onSubmit={handleSubmit(onSubmit)} title="연락처를 입력해주세요">
      {/* @ts-ignore */}
      <StyledLabel as="label" htmlFor="email">
        이메일
      </StyledLabel>
      <TextInput {...register('email')} id="email" placeholder="johndoe@example.com" />
      {/* @ts-ignore */}
      <StyledLabel as="label" htmlFor="phone">
        전화번호
      </StyledLabel>
      <TextInput {...register('phone')} id="phone" placeholder="01012345678" />
      <StyledButton type="submit">다음</StyledButton>
    </AnimatedForm>
  );
};
