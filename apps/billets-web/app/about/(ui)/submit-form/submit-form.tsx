'use client'

import { OpenApiError } from '@/libs/errors'
import { apiClient } from '@/libs/openapi-client'
import { Checkbox, Text } from '@coldsurfers/ocean-road'
import { useMutation } from '@tanstack/react-query'
import { memo, useCallback } from 'react'
import { useFormStatus } from 'react-dom'
import {
  StyledFormLeft,
  StyledFormOuterContainer,
  StyledFormRight,
  StyledSubmitButton,
  StyledSubmitFormContainer,
  StyledTextArea,
  StyledTextInput,
} from './submit-form.styled'

const SubmitButton = ({ isPending }: { isPending?: boolean }) => {
  const { pending } = useFormStatus()
  const pendingState = pending || isPending
  return (
    <StyledSubmitButton type="submit" disabled={pendingState}>
      {pendingState ? 'Submitting...' : 'Submit'}
    </StyledSubmitButton>
  )
}

export const SubmitForm = memo(() => {
  const { isPending, mutateAsync } = useMutation<
    Awaited<ReturnType<typeof apiClient.mailer.sendUserVoice>>,
    OpenApiError,
    Parameters<typeof apiClient.mailer.sendUserVoice>[0]
  >({
    mutationFn: apiClient.mailer.sendUserVoice,
    mutationKey: apiClient.mailer.queryKeys.sendUserVoice(),
  })
  const action = useCallback(
    async (data: FormData) => {
      await mutateAsync({
        email: data.get('billets-voice-form-email')?.toString() ?? '',
        name: data.get('billets-voice-form-name')?.toString() ?? '',
        message: data.get('billets-voice-form-message')?.toString() ?? '',
        updateAgreement: data.get('billets-voice-form-checkbox')?.toString() === 'on',
      })
    },
    [mutateAsync],
  )

  return (
    <StyledFormOuterContainer>
      <Text as="h1">Let me know your opinion 🗯️</Text>
      <StyledSubmitFormContainer>
        <StyledFormLeft>
          <Text as="h3">
            We want to hear all your voices about Billets. Anything is okay, even if you are user, venue owner,
            promoters, artists.
          </Text>
        </StyledFormLeft>
        <StyledFormRight action={action}>
          <StyledTextInput
            id="billets-voice-form-name"
            name="billets-voice-form-name"
            placeholder="Name"
            label="How can I call you?"
          />
          <StyledTextInput
            id="billets-voice-form-email"
            placeholder="Email"
            name="billets-voice-form-email"
            label="Your email, so I can contact you back"
          />
          <StyledTextArea
            label="Give us some more details"
            id="billets-voice-form-message"
            name="billets-voice-form-message"
            placeholder="Please describe your message to me. e.g. 'I am owner of a venue. And I want to work with your app'"
            noResize
          />
          <Checkbox
            name="billets-voice-form-checkbox"
            labelText="I want to receive updates from Billets"
            style={{ marginTop: '1rem' }}
          />
          <SubmitButton isPending={isPending} />
        </StyledFormRight>
      </StyledSubmitFormContainer>
    </StyledFormOuterContainer>
  )
})
