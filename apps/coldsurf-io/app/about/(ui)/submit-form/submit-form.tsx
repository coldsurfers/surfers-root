'use client';

import { apiClient } from '@/libs/openapi-client';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { Checkbox, Text, colors } from '@coldsurfers/ocean-road';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import { useMutation } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import {
  StyledFormLeft,
  StyledFormOuterContainer,
  StyledFormRight,
  StyledSubmitButton,
  StyledSubmitFormContainer,
  StyledTextArea,
  StyledTextInput,
} from './submit-form.styled';

const SubmitButton = ({ isPending }: { isPending?: boolean }) => {
  const { pending } = useFormStatus();
  const pendingState = pending || isPending;
  return (
    <StyledSubmitButton type="submit" disabled={pendingState}>
      {pendingState ? 'Submitting...' : 'Submit'}
    </StyledSubmitButton>
  );
};

type FormValues = {
  name: string;
  email: string;
  message: string;
  updateAgreement: boolean;
};

export const SubmitForm = memo(() => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      updateAgreement: false,
    },
  });
  const { isPending, mutateAsync } = useMutation<
    Awaited<ReturnType<typeof apiClient.mailer.sendUserVoice>>,
    OpenApiError,
    Parameters<typeof apiClient.mailer.sendUserVoice>[0]
  >({
    mutationFn: apiClient.mailer.sendUserVoice,
  });
  const action = useCallback(
    async ({ email, name, message, updateAgreement }: FormValues) => {
      await mutateAsync({
        email,
        name,
        message,
        updateAgreement,
      });
      reset();
      clearErrors();
    },
    [clearErrors, mutateAsync, reset]
  );

  return (
    <StyledFormOuterContainer>
      <Text as="h1">Let me know your opinion 🗯️</Text>
      <StyledSubmitFormContainer>
        <StyledFormLeft>
          <Text as="h3">
            We want to hear all your voices about {SERVICE_NAME}. Anything is okay, even if you are
            user, venue owner, promoters, artists.
          </Text>
        </StyledFormLeft>
        <StyledFormRight onSubmit={handleSubmit(action)}>
          <StyledTextInput
            id="name"
            placeholder="Name"
            {...register('name', {
              required: 'Name is required',
            })}
            label="How can I call you?"
          />
          {errors.name && (
            <Text as="p" style={{ color: colors.oc.red[6].value }}>
              {errors.name.message}
            </Text>
          )}
          <StyledTextInput
            id="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
            })}
            label="Your email, so I can contact you back"
          />
          {errors.email && (
            <Text as="p" style={{ color: colors.oc.red[6].value }}>
              {errors.email.message}
            </Text>
          )}
          <StyledTextArea
            label="Give us some more details"
            id="message"
            {...register('message', {
              required: 'Message is required',
            })}
            placeholder="Please describe your message to me. e.g. 'I am owner of a venue. And I want to work with your app'"
            noResize
          />
          {errors.message && (
            <Text as="p" style={{ color: colors.oc.red[6].value }}>
              {errors.message.message}
            </Text>
          )}
          <Checkbox
            id="updateAgreement"
            labelText={`I want to receive updates from ${SERVICE_NAME}`}
            {...register('updateAgreement')}
            style={{ marginTop: '1rem' }}
          />
          <SubmitButton isPending={isPending} />
        </StyledFormRight>
      </StyledSubmitFormContainer>
    </StyledFormOuterContainer>
  );
});
