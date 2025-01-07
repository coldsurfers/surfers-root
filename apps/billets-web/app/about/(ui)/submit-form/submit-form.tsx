'use client'

import { Checkbox, Text } from '@coldsurfers/ocean-road'
import { memo } from 'react'
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

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <StyledSubmitButton type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </StyledSubmitButton>
  )
}

export const SubmitForm = memo(() => {
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
        <StyledFormRight
          action={async (data) => {
            //  @todo: implement api
          }}
        >
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
          <SubmitButton />
        </StyledFormRight>
      </StyledSubmitFormContainer>
    </StyledFormOuterContainer>
  )
})
