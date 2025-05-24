'use client'

import { COMMON_META_TITLE } from '@/libs/constants'
import { apiClient } from '@/libs/openapi-client'
import { useAuthStore } from '@/libs/stores'
import { authUtils } from '@/libs/utils/utils.auth'
import { OpenApiError } from '@coldsurfers/api-sdk'
import { Button, colors, semantics, Spinner, Text, TextInput } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { useMutation } from '@tanstack/react-query'
import { InfoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
  background-color: ${colors.oc.white.value};

  span {
    color: ${colors.oc.black.value} !important;
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

const ErrorCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${colors.oc.red[3].value};
  width: 430px;
`

const InfoIconUI = styled(InfoIcon)`
  width: 16px;
  height: 16px;
`

const ErrorMessage = styled(Text)`
  font-size: 14px;
  margin: unset;
`

export const LoginForm = () => {
  const router = useRouter()
  const { setIsLoggedIn } = useAuthStore()
  const { register, watch } = useForm<{
    email: string
    password: string
  }>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const formValues = watch()

  const [emailLoginServerError, setEmailLoginServerError] = useState<OpenApiError | null>(null)

  const { mutate: emailLogin, isPending: isEmailLoginPending } = useMutation<
    Awaited<ReturnType<typeof apiClient.auth.signIn>>,
    OpenApiError,
    {
      email: string
      password: string
    }
  >({
    mutationFn: async (data) => {
      const response = await apiClient.auth.signIn({
        provider: 'email',
        ...data,
      })
      return response
    },
    onSuccess: async (data) => {
      setEmailLoginServerError(null)
      try {
        await authUtils.localLogin(data.authToken)
        setIsLoggedIn(true)
        router.replace('/')
      } catch (e) {
        console.error(e)
      }
    },
    onError: (error) => {
      setEmailLoginServerError(error)
    },
  })

  return (
    <>
      <FormLayout>
        <Title as="h1">Welcome back</Title>
        <SubTitle as="p">{COMMON_META_TITLE}</SubTitle>
        {emailLoginServerError && (
          <ErrorCard>
            <InfoIconUI />
            <ErrorMessage as="p">{`로그인에 실패했어요.\n정확한 정보로 다시 시도해주세요.`}</ErrorMessage>
          </ErrorCard>
        )}
        <Form>
          <EmailLoginTextInput placeholder="Email" {...register('email')} />
          <EmailLoginTextInput type="password" placeholder="Password" {...register('password')} />
          <EmailLoginButton type="button" onClick={() => emailLogin(formValues)}>
            Login
          </EmailLoginButton>
        </Form>
        <SocialLoginLayout>
          <DividerText>OR</DividerText>
          <SocialLoginButton type="button">Continue with Google</SocialLoginButton>
          <SocialLoginButton type="button">Continue with Apple</SocialLoginButton>
        </SocialLoginLayout>
      </FormLayout>
      {isEmailLoginPending && <Spinner variant="page-overlay" />}
    </>
  )
}
