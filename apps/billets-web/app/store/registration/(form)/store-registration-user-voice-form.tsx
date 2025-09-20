'use client';

import { apiClient } from '@/libs/openapi-client';
import { Button, Spinner, TextArea } from '@coldsurfers/ocean-road';
import { tryParse } from '@coldsurfers/shared-utils';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatedForm } from './animated-form';
import { FORM_STORAGE_KEY } from './constants';
import type { StoreRegistrationContactFormType } from './types';

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
  const router = useRouter();
  const { mutate: sendUserVoice, isPending } = useMutation({
    mutationFn: apiClient.mailer.sendUserVoice,
    onSuccess: () => {
      sessionStorage.removeItem(FORM_STORAGE_KEY.CONTACT);
      sessionStorage.removeItem(FORM_STORAGE_KEY.MESSAGE);
      router.push('/store/registration/success');
    },
  });

  const prevStoredData = useMemo(() => {
    return tryParse<StoreRegistrationContactFormType>(
      sessionStorage.getItem(FORM_STORAGE_KEY.CONTACT) ?? ''
    );
  }, []);

  const storedMessage = useMemo(() => {
    return sessionStorage.getItem(FORM_STORAGE_KEY.MESSAGE);
  }, []);

  const { handleSubmit, register } = useForm<Form>({
    defaultValues: {
      message: storedMessage ?? '',
    },
  });

  const onSubmit = (data: Form) => {
    if (isPending) {
      return;
    }
    sendUserVoice({
      email: prevStoredData?.email ?? '',
      message: data.message,
      phone: prevStoredData?.phone ?? '',
    });
  };
  return (
    <AnimatedForm
      title="전하고 싶은 의견이 있으시면, 입력해주세요"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledTextArea
        noResize={false}
        placeholder="전하고 싶은 의견을 입력해주세요"
        maxLength={1000}
        {...register('message', {
          maxLength: 1000,
          onChange: (e) => {
            sessionStorage.setItem(FORM_STORAGE_KEY.MESSAGE, e.target.value);
          },
        })}
      />
      <StyledButton type="submit">제출</StyledButton>
      {isPending && <Spinner variant="page-overlay" />}
    </AnimatedForm>
  );
};
