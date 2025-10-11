'use client';

import { apiClient } from '@/libs/openapi-client';
import { appSessionStorage } from '@/libs/utils';
import { AnimatedForm } from '@/shared/ui/animated-form';
import { Button, Spinner, TextArea } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
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
      appSessionStorage?.remove('@coldsurf-io/user-voice-contact');
      appSessionStorage?.remove('@coldsurf-io/user-voice-message');
      router.push('/store/registration/success');
    },
  });

  const prevStoredData = useMemo(() => {
    return appSessionStorage?.get<StoreRegistrationContactFormType>(
      '@coldsurf-io/user-voice-contact'
    );
  }, []);

  const storedMessage = useMemo(() => {
    return appSessionStorage?.get<string>('@coldsurf-io/user-voice-message');
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
            appSessionStorage?.set('@coldsurf-io/user-voice-message', e.target.value);
          },
        })}
      />
      <StyledButton type="submit">제출</StyledButton>
      {isPending && <Spinner variant="page-overlay" />}
    </AnimatedForm>
  );
};
