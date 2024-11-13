import { Button, Text, TextInput, Toast, colors } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { memo, useEffect, useState } from 'react'
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
  const [mutateCreateEmailAuthRequest, { data: createEmailAuthRequestData, loading: createEmailAuthRequestLoading }] =
    useCreateEmailAuthRequestMutation()
  const [
    mutateAuthenticateEmailAuthRequest,
    { data: authenticateEmailAuthRequestData, loading: authenticateEmailAuthRequestLoading },
  ] = useAuthenticateEmailAuthRequestMutation()
  const [mutateCreateUser, { data: createUserData, loading: createUserLoading }] = useCreateUserMutation()

  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const loading = createEmailAuthRequestLoading || authenticateEmailAuthRequestLoading || createUserLoading

  useEffect(() => {
    if (!authenticateEmailAuthRequestData?.authenticateEmailAuthRequest) return
    const { authenticateEmailAuthRequest } = authenticateEmailAuthRequestData
    switch (authenticateEmailAuthRequest.__typename) {
      case 'HttpError':
        setToastVisible(true)
        setToastMessage(authenticateEmailAuthRequest.message)
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
    console.log(createUser)
    switch (createUser.__typename) {
      case 'HttpError':
        setToastVisible(true)
        setToastMessage(createUser.message)
        break
      case 'User':
        setSigninCompleted(true)
        setToastMessage('가입이 완료되었습니다.\n로그인 페이지로 이동합니다.')
        setTimeout(() => {
          router.push('/auth/signin')
        }, 1500)
        break
      default:
        break
    }
  }, [createUserData, router])

  const authenticatedEmail = createEmailAuthRequestData?.createEmailAuthRequest.email ?? ''

  return (
    <>
      <Wrapper>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 14,
            fontWeight: 'bold',
          }}
        >
          WAMUSEUM
        </Text>
        <TextInput
          placeholder="이메일"
          onChange={(event) => setEmail(event.target.value)}
          style={{ width: 300 }}
          disabled={emailAuthenticated}
        />
        {emailSent && (
          <TextInput
            placeholder="인증번호를 입력해주세요"
            style={{ marginTop: 14 }}
            onChange={(event) => setAuthcode(event.target.value)}
            disabled={emailAuthenticated}
          />
        )}
        {!emailAuthenticated && (
          <EmailAuthRequestButtonsWrapper>
            <Button
              disabled={!validateEmail(email) || createEmailAuthRequestLoading}
              onClick={() => {
                setEmailSent(true)
                mutateCreateEmailAuthRequest({
                  variables: {
                    input: {
                      email,
                    },
                  },
                })
              }}
              style={{ flex: 1, backgroundColor: colors.oc.yellow[4].value }}
            >
              {emailSent ? '다시 요청하기' : '인증번호 받기'}
            </Button>
            <Button
              style={{
                flex: 1,
                marginLeft: 14,
                backgroundColor: colors.oc.black.value,
              }}
              disabled={!createEmailAuthRequestData || !authcode || authenticateEmailAuthRequestLoading}
              onClick={() => {
                mutateAuthenticateEmailAuthRequest({
                  variables: {
                    input: {
                      email: authenticatedEmail,
                      authcode,
                    },
                  },
                })
              }}
            >
              인증하기
            </Button>
          </EmailAuthRequestButtonsWrapper>
        )}
        {emailAuthenticated && (
          <TextInput
            placeholder="패스워드"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            style={{ width: 300, marginTop: 14 }}
          />
        )}
        {emailAuthenticated && (
          <TextInput
            placeholder="패스워드 확인"
            onChange={(event) => setPasswordConfirm(event.target.value)}
            type="password"
            style={{ width: 300, marginTop: 14 }}
          />
        )}
        {emailAuthenticated && (
          <Button
            onClick={() => {
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
            style={{ marginTop: 14, backgroundColor: colors.oc.black.value }}
            disabled={createUserLoading || signinCompleted}
          >
            가입 요청하기
          </Button>
        )}
      </Wrapper>
      <AnimatePresence>
        {(toastVisible || signinCompleted) && (
          <Toast
            visible={toastVisible || signinCompleted}
            zIndex={99}
            message={toastMessage}
            onClose={() => setToastVisible(false)}
          />
        )}
      </AnimatePresence>
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

export default memo(AuthRequestForm)
