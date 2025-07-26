import { AuthContext, ToastVisibleContext, ToastVisibleContextProvider } from '@/lib';
import { apiClient } from '@/lib/api/openapi-client';
import { CommonScreenLayout } from '@/ui';
import { NAVIGATION_HEADER_HEIGHT } from '@/ui/navigation-header/navigation-header.constants';
import type { OpenApiError, components, paths } from '@coldsurfers/api-sdk';
import { Button, Spinner, TextInput } from '@coldsurfers/ocean-road/native';
import { useMutation } from '@tanstack/react-query';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { useEmailLoginScreenNavigation } from './email-login-screen.hooks';

const _EmailLoginScreen = () => {
  const { show } = useContext(ToastVisibleContext);
  const { login } = useContext(AuthContext);
  const { navigate } = useEmailLoginScreenNavigation();
  const {
    mutate,
    isPending: isPendingSignIn,
    error,
  } = useMutation<
    components['schemas']['UserWithAuthTokenDTOSchema'],
    OpenApiError,
    paths['/v1/auth/signin']['post']['requestBody']['content']['application/json']
  >({
    mutationFn: apiClient.auth.signIn,
  });
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onPressSignup = useCallback(() => {
    navigate('EmailSignupScreen', {
      type: 'email-signup',
    });
  }, [navigate]);

  const onPressSignIn = useCallback(() => {
    if (!email) {
      show({
        type: 'warning',
        message: '이메일을 입력해주세요',
        autoHide: true,
        duration: 3000,
      });
      return;
    }
    if (!password) {
      show({
        type: 'warning',
        message: '비밀번호를 입력해주세요',
        autoHide: true,
        duration: 3000,
      });
      return;
    }
    const provider = 'email';
    mutate(
      {
        provider,
        email,
        password,
      },
      {
        onSuccess: async (signInData) => {
          if (!signInData) return;
          const { authToken, user } = signInData;
          if (authToken) {
            await login({
              authToken,
              user,
              analyticsOptions: {
                provider,
              },
            });

            navigate('MainTabNavigation', {
              screen: 'HomeStackNavigation',
              params: {
                screen: 'HomeScreen',
                params: {},
              },
            });
          }
        },
      }
    );
  }, [email, login, mutate, navigate, password, show]);

  useEffect(() => {
    if (error && error) {
      show({
        type: 'error',
        message: '이메일 로그인에 실패했어요.',
        autoHide: true,
        duration: 5000,
      });
    }
  }, [error, show]);

  return (
    <CommonScreenLayout>
      <KeyboardAvoidingView style={styles.innerWrapper} behavior="padding">
        <View style={styles.formWrapper}>
          <TextInput
            placeholder="이메일"
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="비밀번호"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.textInputSpace}
          />
          <Button onPress={onPressSignIn} style={styles.buttonSpace}>
            로그인하기
          </Button>
          <Button theme="pink" onPress={onPressSignup} style={styles.buttonSpace}>
            이메일로 가입하기
          </Button>
        </View>
      </KeyboardAvoidingView>
      {isPendingSignIn ? <Spinner /> : null}
    </CommonScreenLayout>
  );
};

export const EmailLoginScreen = () => {
  return (
    <ToastVisibleContextProvider>
      <_EmailLoginScreen />
    </ToastVisibleContextProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backButton: {
    marginLeft: 16,
  },
  innerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: 280,
    marginTop: -NAVIGATION_HEADER_HEIGHT,
  },
  textInputSpace: {
    marginTop: 12,
  },
  buttonSpace: {
    marginTop: 12,
  },
});
