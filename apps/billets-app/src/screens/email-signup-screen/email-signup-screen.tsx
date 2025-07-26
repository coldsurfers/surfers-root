import { ToastVisibleContext, ToastVisibleContextProvider, validateEmail } from '@/lib';
import { CommonScreenLayout } from '@/ui';
import type { OpenApiError, components, paths } from '@coldsurfers/api-sdk';
import { Button, Spinner, TextInput } from '@coldsurfers/ocean-road/native';
import { useMutation } from '@tanstack/react-query';
import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { match } from 'ts-pattern';
import {
  useEmailSignupScreenNavigation,
  useEmailSignupScreenRoute,
} from './email-signup-screen.hooks';

// @todo: refactor EmailSignupScreen to SendAuthCodeScreen
const _EmailSignupScreen = () => {
  const route = useEmailSignupScreenRoute();
  const { show } = useContext(ToastVisibleContext);
  const { navigate } = useEmailSignupScreenNavigation();
  const { mutate: sendEmailConfirm, isPending: isPendingSendConfirmEmail } = useMutation<
    components['schemas']['ConfirmAuthCodeResponseDTOSchema'],
    OpenApiError,
    paths['/v1/auth/email/send-auth-code']['post']['requestBody']['content']['application/json']
  >({
    onSuccess: (data) => {
      if (!data) {
        return;
      }
      match(route.params.type)
        .with('activate-user', () => {
          navigate('ActivateUserConfirmScreen', {
            email: data.email,
          });
        })
        .with('email-signup', () => {
          navigate('EmailConfirmScreen', {
            email: data.email,
          });
        })
        .exhaustive();
    },
    onError: () => {
      const message = '알 수 없는 오류가 발생했어요';
      show({
        autoHide: true,
        duration: 2000,
        message,
        type: 'error',
      });
    },
  });
  const [email, setEmail] = useState<string>('');
  const [validated, setValidated] = useState<boolean>(false);
  const onPressNext = useCallback(() => {
    sendEmailConfirm({
      email,
    });
  }, [sendEmailConfirm, email]);
  const onChangeText = useCallback((text: string) => {
    setEmail(text);
    setValidated(validateEmail(text) !== null);
  }, []);

  return (
    <CommonScreenLayout>
      <TextInput
        autoCapitalize="none"
        onChangeText={onChangeText}
        placeholder="이메일을 입력해주세요"
        style={styles.textInput}
      />
      <Button style={styles.button} onPress={onPressNext} disabled={!validated}>
        다음으로 이동하기
      </Button>
      {isPendingSendConfirmEmail && <Spinner positionCenter />}
    </CommonScreenLayout>
  );
};
export const EmailSignupScreen = () => {
  return (
    <ToastVisibleContextProvider>
      <_EmailSignupScreen />
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
