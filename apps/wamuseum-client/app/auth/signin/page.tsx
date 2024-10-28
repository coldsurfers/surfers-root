'use client'

import { LoginForm as LoginFormUI, type LoginFormRefHandle, Toast } from '@coldsurfers/hotsurf'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState, useRef } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import useLoginMutation from '@/hooks/useLoginMutation'
import storage from '@/utils/storage/storage'
import Loader from '@/ui/Loader'
import { ME_QUERY } from '../../../gql/queries'

const FormLayout = styled.section`
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

const SignInPage = () => {
  const router = useRouter()
  const formRef = useRef<LoginFormRefHandle>(null)
  const [mutate, { data, loading, client }] = useLoginMutation()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const login = useCallback(
    (params: { email: string; password: string }) =>
      mutate({
        variables: {
          input: params,
        },
      }),
    [mutate],
  )

  useEffect(() => {
    if (!data?.login) return
    // eslint-disable-next-line no-shadow
    const { login } = data
    switch (login.__typename) {
      case 'HttpError':
        setErrorMessage(login.message)
        break
      case 'UserWithAuthToken':
        storage.set(
          '@wamuseum-client/auth-token',
          JSON.stringify({
            ...login.authToken,
          }),
        )
        client.refetchQueries({
          include: [ME_QUERY],
        })
        break
      default:
        break
    }
  }, [client, data, router])

  useEffect(() => {
    const onKeypress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const currentInputValue = formRef.current?.currentInputValue()
        if (currentInputValue) {
          login(currentInputValue)
        }
      }
    }
    document.addEventListener('keypress', onKeypress)

    return () => {
      document.removeEventListener('keypress', onKeypress)
    }
  }, [login])

  return (
    <>
      <FormLayout>
        <LoginFormUI
          ref={formRef}
          onPressLoginButton={login}
          withRequestButtonUI
          onPressRequestButtonUI={useCallback(() => {
            router.push('/auth/request')
          }, [router])}
        />
      </FormLayout>
      {loading && <Loader />}
      {errorMessage && (
        <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
          <Toast type="error" message={errorMessage} onPress={() => setErrorMessage('')} />
        </View>
      )}
    </>
  )
}

export default SignInPage
