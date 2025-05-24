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
  min-width: 430px;

  margin-top: 2rem;
`

const EmailLoginTextInput = styled(TextInput)`
  width: 100%;

  & + & {
    margin-top: 1rem;
  }
`

const EmailLoginButton = styled(Button)`
  width: 100%;
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
        <EmailLoginButton>Login</EmailLoginButton>
      </Form>
    </FormLayout>
  )
}
