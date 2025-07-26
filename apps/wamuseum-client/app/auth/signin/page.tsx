'use client';

import { LoginForm, type LoginFormRefHandle } from '@/ui';
import { authUtils } from '@/utils/utils.auth';
import { Spinner, Toast } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLoginMutation } from 'src/__generated__/graphql';

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
`;

const SignInPage = () => {
  const router = useRouter();
  const formRef = useRef<LoginFormRefHandle>(null);
  const [mutate, { loading }] = useLoginMutation({
    onError: () => {
      setToastVisible(true);
    },
    onCompleted: (data) => {
      if (!data?.login) return;
      const { login } = data;
      switch (login.__typename) {
        case 'UserWithAuthToken':
          authUtils
            .localLogin(login.authToken)
            .then(() => {
              router.push('/');
            })
            .catch((e) => {
              console.error(e);
            });
          break;
        default:
          break;
      }
    },
  });
  const [toastVisible, setToastVisible] = useState(false);

  const login = useCallback(
    (params: { email: string; password: string }) =>
      mutate({
        variables: {
          input: params,
        },
      }),
    [mutate]
  );

  useEffect(() => {
    const onKeypress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const currentInputValue = formRef.current?.currentInputValue();
        if (currentInputValue) {
          login(currentInputValue);
        }
      }
    };
    document.addEventListener('keypress', onKeypress);

    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, [login]);

  return (
    <>
      <FormLayout>
        <LoginForm
          ref={formRef}
          onPressLoginButton={login}
          withRequestButtonUI
          formTitle="WAMUSEUM"
        />
      </FormLayout>
      {loading && <Spinner variant="page-overlay" />}
      <AnimatePresence>
        {toastVisible && (
          <Toast message={'Failed to login'} onClose={() => setToastVisible(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default SignInPage;
