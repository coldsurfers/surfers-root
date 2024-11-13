'use client'

import useLoginMutation from '@/hooks/useLoginMutation'
import { LoginForm, type LoginFormRefHandle } from '@/ui'
import Loader from '@/ui/Loader'
import { authUtils } from '@/utils/utils.auth'
import { Toast } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { AnimatePresence } from 'framer-motion'
import { ME_QUERY } from 'gql/queries'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

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
  const [mutate, { data, loading, client }] = useLoginMutation({
    onError: () => {
      setToastVisible(true)
    },
  })
  const [toastVisible, setToastVisible] = useState(false)

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
      case 'UserWithAuthToken':
        authUtils.login(login.authToken).then(() => {
          client.refetchQueries({
            include: [ME_QUERY],
          })
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
        <LoginForm
          ref={formRef}
          onPressLoginButton={login}
          withRequestButtonUI
          onPressRequestButtonUI={useCallback(() => {
            router.push('/auth/request')
          }, [router])}
          formTitle="WAMUSEUM"
        />
      </FormLayout>
      {loading && <Loader />}
      <AnimatePresence>
        {toastVisible && (
          <Toast
            visible={toastVisible}
            message={'Failed to login'}
            onClose={() => setToastVisible(false)}
            zIndex={99}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default SignInPage
