'use client'

import { Checkbox, Text } from '@coldsurfers/ocean-road'
import { memo } from 'react'
import {
  StyledFormLeft,
  StyledFormOuterContainer,
  StyledFormRight,
  StyledSubmitButton,
  StyledSubmitFormContainer,
  StyledTextArea,
  StyledTextInput,
} from './submit-form.styled'

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
        <StyledFormRight>
          <StyledTextInput id="billets-voice-form-name" placeholder="Name" label="How can I call you?" />
          <StyledTextInput
            id="billets-voice-form-email"
            placeholder="Email"
            label="Your email, so I can contact you back"
          />
          <StyledTextArea
            label="Give us some more details"
            id="billets-voice-form-message"
            placeholder="Please describe your message to me. e.g. 'I am owner of a venue. And I want to work with your app'"
            noResize
          />
          <Checkbox labelText="I want to receive updates from Billets" style={{ marginTop: '1rem' }} />
          <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
        </StyledFormRight>
      </StyledSubmitFormContainer>
    </StyledFormOuterContainer>
  )
})
