import { Button, palette, Text, TextInput, Toast } from '@coldsurfers/hotsurf'
import { useRouter } from 'next/navigation'
import { memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import useAuthenticateEmailAuthRequestMutation from '../hooks/useAuthenticateEmailAuthRequestMutation'
import useCreateEmailAuthRequestMutation from '../hooks/useCreateEmailAuthRequestMutation'
import useCreateUserMutation from '../hooks/useCreateUserMutation'
import validateEmail from '../utils/validateEmail'
import Loader from './Loader'

interface Props {}

// eslint-disable-next-line no-empty-pattern
const AuthRequestForm = ({}: Props) => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [authcode, setAuthcode] = useState<string>('')
  const [emailSent, setEmailSent] = useState<boolean>(false)
  const [emailAuthenticated, setEmailAuthenticated] = useState<boolean>(false)
  const [signinCompleted, setSigninCompleted] = useState<boolean>(false)
  const [
    mutateCreateEmailAuthRequest,
    {
      data: createEmailAuthRequestData,
      loading: createEmailAuthRequestLoading,
    },
  ] = useCreateEmailAuthRequestMutation()
  const [
    mutateAuthenticateEmailAuthRequest,
    {
      data: authenticateEmailAuthRequestData,
      loading: authenticateEmailAuthRequestLoading,
    },
  ] = useAuthenticateEmailAuthRequestMutation()
  const [
    mutateCreateUser,
    { data: createUserData, loading: createUserLoading },
  ] = useCreateUserMutation()

  const [
    authenticateEmailAuthRequestErrorMessage,
    setAuthenticateEmailAuthRequestErrorMessage,
  ] = useState<string>('')
  const [createUserErrorMessage, setCreateUserErrorMessage] =
    useState<string>('')

  const loading =
    createEmailAuthRequestLoading ||
    authenticateEmailAuthRequestLoading ||
    createUserLoading

  useEffect(() => {
    if (!authenticateEmailAuthRequestData?.authenticateEmailAuthRequest) return
    const { authenticateEmailAuthRequest } = authenticateEmailAuthRequestData
    switch (authenticateEmailAuthRequest.__typename) {
      case 'HttpError':
        setAuthenticateEmailAuthRequestErrorMessage(
          authenticateEmailAuthRequest.message
        )
        break
      case 'EmailAuthRequest':
        setEmailAuthenticated(!!authenticateEmailAuthRequest.authenticated)
        break
      default:
        break
    }
  }, [authenticateEmailAuthRequestData])

  useEffect(() => {
    if (!createUserData?.createUser) return
    const { createUser } = createUserData
    switch (createUser.__typename) {
      case 'HttpError':
        setCreateUserErrorMessage(createUser.message)
        break
      case 'User':
        setSigninCompleted(true)
        setTimeout(() => {
          router.push('/auth/signin')
        }, 1500)
        break
      default:
        break
    }
  }, [createUserData, router])

  const authenticatedEmail =
    createEmailAuthRequestData?.createEmailAuthRequest.email ?? ''

  return (
    <>
      <Wrapper>
        <Text
          weight="bold"
          style={{
            fontSize: 18,
            marginBottom: 14,
          }}
        >
          ColdSurf 어드민
        </Text>
        <TextInput
          placeholder="이메일"
          onChangeText={(text) => setEmail(text)}
          style={{ width: 300 }}
          editable={!emailAuthenticated}
        />
        {emailSent && (
          <TextInput
            placeholder="인증번호를 입력해주세요"
            style={{ marginTop: 14 }}
            onChangeText={(text) => setAuthcode(text)}
            editable={!emailAuthenticated}
          />
        )}
        {!emailAuthenticated && (
          <EmailAuthRequestButtonsWrapper>
            <Button
              disabled={!validateEmail(email) || createEmailAuthRequestLoading}
              text={emailSent ? '다시 요청하기' : '인증번호 받기'}
              onPress={() => {
                setEmailSent(true)
                mutateCreateEmailAuthRequest({
                  variables: {
                    input: {
                      email,
                    },
                  },
                })
              }}
              style={{ flex: 1, backgroundColor: palette.yellow }}
            />
            <Button
              text="인증하기"
              style={{
                flex: 1,
                marginLeft: 14,
                backgroundColor: palette.black,
              }}
              disabled={
                !createEmailAuthRequestData ||
                !authcode ||
                authenticateEmailAuthRequestLoading
              }
              onPress={() => {
                mutateAuthenticateEmailAuthRequest({
                  variables: {
                    input: {
                      email: authenticatedEmail,
                      authcode,
                    },
                  },
                })
              }}
            />
          </EmailAuthRequestButtonsWrapper>
        )}
        {emailAuthenticated && (
          <TextInput
            placeholder="패스워드"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={{ width: 300, marginTop: 14 }}
          />
        )}
        {emailAuthenticated && (
          <TextInput
            placeholder="패스워드 확인"
            onChangeText={(text) => setPasswordConfirm(text)}
            secureTextEntry
            style={{ width: 300, marginTop: 14 }}
          />
        )}
        {emailAuthenticated && (
          <Button
            text="가입 요청하기"
            onPress={() => {
              mutateCreateUser({
                variables: {
                  input: {
                    email: authenticatedEmail,
                    password,
                    passwordConfirm,
                  },
                },
              })
            }}
            style={{ marginTop: 14, backgroundColor: palette.black }}
            disabled={createUserLoading || signinCompleted}
          />
        )}
      </Wrapper>
      {!!authenticateEmailAuthRequestErrorMessage && (
        <ToastWrapper>
          <Toast
            type="error"
            message={authenticateEmailAuthRequestErrorMessage}
          />
        </ToastWrapper>
      )}
      {!!createUserErrorMessage && (
        <ToastWrapper>
          <Toast type="error" message={createUserErrorMessage} />
        </ToastWrapper>
      )}
      {signinCompleted && (
        <ToastWrapper>
          <Toast
            type="info"
            message={'가입이 완료되었습니다.\n로그인 페이지로 이동합니다.'}
          />
        </ToastWrapper>
      )}
      {loading && <Loader />}
    </>
  )
}

const Wrapper = styled.section`
  /* border: 1px solid red; */
  position: absolute;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */

  transform: translate(-50%, -50%);

  padding: 1rem;
  border-radius: 3px;

  display: flex;
  flex-direction: column;

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`

const EmailAuthRequestButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 14px;
`

const ToastWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
`

export default memo(AuthRequestForm)
