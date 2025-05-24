'use client'

import { COMMON_META_TITLE } from '@/libs/constants'
import { Button, semantics, Text, TextInput } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'

const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`

const Title = styled(Text)`
  font-size: 32px;
`

const SubTitle = styled(Text)`
  font-size: 16px;
  line-height: 1.5;
  color: ${semantics.color.foreground[2]};
`

const Form = styled.form`
  margin-top: 2rem;

  min-width: 430px;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const EmailLoginTextInput = styled(TextInput)`
  width: 100%;
`

const EmailLoginButton = styled(Button)`
  width: 100%;
`

const SocialLoginButton = styled(Button)`
  width: 100%;
  margin-top: 0.5rem;
  background-color: ${semantics.color.background[1]};

  span {
    color: ${semantics.color.foreground[1]} !important;
  }
`

const DividerText = styled(Text)`
  font-size: 14px;
  text-align: center;
  margin-bottom: 0.5rem;
`

const SocialLoginLayout = styled.div`
  min-width: 430px;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 1rem;
`

export const LoginForm = () => {
  return (
    <FormLayout>
      <Title as="h1">Welcome back</Title>
      <SubTitle as="p">{COMMON_META_TITLE}</SubTitle>
      <Form>
        <EmailLoginTextInput placeholder="Email"></EmailLoginTextInput>
        <EmailLoginTextInput placeholder="Password"></EmailLoginTextInput>
        <EmailLoginButton type="submit">Login</EmailLoginButton>
      </Form>
      <SocialLoginLayout>
        <DividerText>OR</DividerText>
        <SocialLoginButton type="button">Continue with Google</SocialLoginButton>
        <SocialLoginButton type="button">Continue with Apple</SocialLoginButton>
      </SocialLoginLayout>
    </FormLayout>
  )
}
