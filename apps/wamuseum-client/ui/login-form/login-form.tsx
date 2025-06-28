'use client';

import { Button, Text, TextInput } from '@coldsurfers/ocean-road';
import Link from 'next/link';
import {
  type MouseEventHandler,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { StyledLoginFormContainer } from './login-form.styled';
import type { LoginFormRefHandle } from './login-form.types';

interface Props {
  onPressLoginButton: (params: { email: string; password: string }) => void;
  withRequestButtonUI?: boolean;
  onPressCreateAccountButtonUI?: () => void;
  formTitle?: string;
}

export const LoginForm = forwardRef<LoginFormRefHandle, Props>(
  ({ onPressLoginButton, withRequestButtonUI, onPressCreateAccountButtonUI, formTitle }, ref) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useImperativeHandle(ref, () => ({
      currentInputValue() {
        return {
          email,
          password,
        };
      },
    }));

    const onClickLogin = useCallback<MouseEventHandler<HTMLButtonElement>>(
      (event) => {
        event.preventDefault();
        onPressLoginButton({ email, password });
      },
      [email, onPressLoginButton, password]
    );

    return (
      <StyledLoginFormContainer>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 14,
            fontWeight: 'bold',
          }}
        >
          {formTitle}
        </Text>
        <TextInput
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일"
          style={{ width: 300 }}
        />
        <TextInput
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="패스워드"
          type="password"
          style={{ width: 300, marginTop: 14 }}
        />
        <Button onClick={onClickLogin} style={{ marginTop: 14 }}>
          로그인
        </Button>
        <Button onClick={onPressCreateAccountButtonUI} style={{ marginTop: 14 }}>
          계정 만들기
        </Button>
        {withRequestButtonUI && (
          <Link href="/auth/request" style={{ width: '100%' }}>
            <Button style={{ marginTop: 14, width: '100%' }}>가입 요청하기</Button>
          </Link>
        )}
      </StyledLoginFormContainer>
    );
  }
);
