'use client';

import { Button, Text, TextInput } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const AnimatedForm = motion.form;
const StyledAnimatedForm = styled(AnimatedForm)`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  max-width: 430px;
`;
const StyledFormTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;

`;
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

  const onSubmit = (data: Form) => {
    console.log(data);
  };

  return (
    <StyledAnimatedForm
      initial={{ opacity: 0, translateX: '-10%' }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: '-10%' }}
      transition={{ duration: 0.125, type: 'spring', stiffness: 100 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledFormTitle>연락처를 입력해주세요</StyledFormTitle>
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
    </StyledAnimatedForm>
  );
};
