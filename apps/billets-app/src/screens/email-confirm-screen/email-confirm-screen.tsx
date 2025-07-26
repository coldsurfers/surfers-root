import { apiClient } from '@/lib/api/openapi-client';
import { CommonScreenLayout } from '@/ui';
import type { OpenApiError, components, paths } from '@coldsurfers/api-sdk';
import { Button, Spinner, TextInput } from '@coldsurfers/ocean-road/native';
import { useMutation } from '@tanstack/react-query';
import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../../lib/contexts/auth-context/auth-context';
import {
  ToastVisibleContext,
  ToastVisibleContextProvider,
} from '../../lib/contexts/toast-visible-context/toast-visible-context';
import palettes from '../../lib/palettes';
import {
  useEmailConfirmScreenNavigation,
  useEmailConfirmScreenRoute,
} from './email-confirm-screen.hooks';

const _EmailConfirmScreen = () => {
  const navigation = useEmailConfirmScreenNavigation();
  const { params } = useEmailConfirmScreenRoute();
  const { show } = useContext(ToastVisibleContext);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');
  const [passwordConfirmText, setPasswordConfirmText] = useState<string>('');
  const { login } = useContext(AuthContext);
  const { mutate: mutateEmailConfirm, isPending: isLoadingEmailConfirm } = useMutation<
    components['schemas']['ConfirmAuthCodeResponseDTOSchema'],
    OpenApiError,
    paths['/v1/auth/email/confirm-auth-code']['post']['requestBody']['content']['application/json']
  >({
    mutationFn: (body) => apiClient.auth.confirmAuthCode(body),
    onSuccess: (data) => {
      if (!data) {
        return;
      }
      show({
        autoHide: true,
        duration: 2000,
        message: '이메일 인증이 완료되었어요',
      });
      setConfirmed(true);
    },
    onError: (error) => {
      let message = '';
      if (error.code === 'EMAIL_AUTH_REQUEST_ALREADY_AUTHENTICATED') {
        message = '이미 인증되었어요';
      }
      if (
        error.code === 'INVALID_EMAIL_AUTH_REQUEST' ||
        error.code === 'EMAIL_AUTH_REQUEST_TIMEOUT'
      ) {
        message = '인증번호가 일치하지 않거나, 인증 시간이 지났어요';
      }
      show({
        autoHide: true,
        duration: 2000,
        message,
        type: 'error',
      });
    },
  });

  const { mutate: mutateSignupEmail, isPending: isLoadingSignupEmail } = useMutation<
    components['schemas']['UserWithAuthTokenDTOSchema'],
    OpenApiError,
    paths['/v1/auth/signup']['post']['requestBody']['content']['application/json']
  >({
    mutationFn: (body) => apiClient.auth.signup(body),
    onSuccess: async (data) => {
      if (!data) {
        return;
      }

      const { authToken, user } = data;
      show({
        autoHide: true,
        duration: 2000,
        message: '회원가입이 완료되었어요!🎉',
      });
      setTimeout(async () => {
        await login({
          user,
          authToken,
          analyticsOptions: {
            provider: 'email',
          },
        });
        navigation.navigate('MainTabNavigation', {
          screen: 'HomeStackNavigation',
          params: {
            screen: 'HomeScreen',
            params: {},
          },
        });
      }, 2000);
    },
    onError: () => {
      show({
        type: 'error',
        message: '가입 도중 오류가 발생했어요',
        autoHide: true,
        duration: 5000,
      });
    },
  });

  const onChangeConfirmText = useCallback((text: string) => {
    setConfirmText(text);
  }, []);

  const onChangePasswordText = useCallback((text: string) => {
    setPasswordText(text);
  }, []);

  const onChangePasswordConfirmText = useCallback((text: string) => {
    setPasswordConfirmText(text);
  }, []);

  const onPressConfirm = useCallback(() => {
    if (isLoadingEmailConfirm) {
      return;
    }
    mutateEmailConfirm({
      email: params.email,
      authCode: confirmText,
    });
  }, [confirmText, isLoadingEmailConfirm, mutateEmailConfirm, params.email]);

  const onPressSignup = useCallback(() => {
    if (isLoadingSignupEmail) {
      return;
    }
    if (passwordText !== passwordConfirmText) {
      show({
        message: '두 비밀번호를 같게 입력해주세요',
        type: 'warning',
        autoHide: true,
        duration: 5000,
      });
      return;
    }
    if (passwordText.length < 8 || passwordText.length > 30) {
      show({
        message: '비밀번호의 길이는 최소 8자 이상, 최대 30자까지만 가능해요',
        type: 'warning',
        autoHide: true,
        duration: 5000,
      });
      return;
    }
    const regex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
    );
    if (!regex.test(passwordText)) {
      show({
        message: '비밀번호는 최소 1개 이상의 대소문자와 숫자, 특수문자를 포함해야 해요',
        type: 'warning',
        autoHide: true,
        duration: 5000,
      });
      return;
    }
    mutateSignupEmail({
      email: params.email,
      password: passwordText,
      provider: 'email',
    });
  }, [
    isLoadingSignupEmail,
    mutateSignupEmail,
    params.email,
    passwordConfirmText,
    passwordText,
    show,
  ]);

  return (
    <CommonScreenLayout>
      {confirmed ? (
        <>
          <TextInput
            placeholder="비밀번호를 입력해주세요"
            style={styles.textInput}
            onChangeText={onChangePasswordText}
            secureTextEntry
            autoCapitalize="none"
          />
          <TextInput
            placeholder="비밀번호 확인"
            style={styles.textInput}
            onChangeText={onChangePasswordConfirmText}
            secureTextEntry
            autoCapitalize="none"
          />
        </>
      ) : (
        <TextInput
          placeholder="인증번호를 입력해주세요"
          keyboardType="number-pad"
          style={styles.textInput}
          editable={!confirmed}
          onChangeText={onChangeConfirmText}
        />
      )}

      <Button
        style={[
          {
            backgroundColor: palettes.lightblue[400],
          },
          styles.button,
        ]}
        onPress={confirmed ? onPressSignup : onPressConfirm}
      >
        {confirmed ? '비밀번호 설정하기' : '인증하기'}
      </Button>
      {isLoadingEmailConfirm && <Spinner />}
    </CommonScreenLayout>
  );
};

export const EmailConfirmScreen = () => {
  return (
    <ToastVisibleContextProvider>
      <_EmailConfirmScreen />
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
  textInput: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  button: {
    marginTop: 12,
    marginHorizontal: 16,
  },
});
