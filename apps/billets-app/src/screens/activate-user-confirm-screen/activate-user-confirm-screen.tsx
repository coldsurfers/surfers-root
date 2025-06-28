import { ToastVisibleContext, ToastVisibleContextProvider } from '@/lib';
import { apiClient } from '@/lib/api/openapi-client';
import { CommonScreenLayout } from '@/ui';
import type { OpenApiError, components, paths } from '@coldsurfers/api-sdk';
import { colors } from '@coldsurfers/ocean-road';
import { Button, Spinner, TextInput } from '@coldsurfers/ocean-road/native';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useActivateUserConfirmScreenNavigation,
  useActivateUserConfirmScreenRoute,
} from './activate-user-confirm-screen.hook';

const Screen = () => {
  const { show } = useContext(ToastVisibleContext);
  const { top: topInset } = useSafeAreaInsets();
  const navigation = useActivateUserConfirmScreenNavigation();
  const route = useActivateUserConfirmScreenRoute();
  const [confirmText, setConfirmText] = useState('');

  const { mutate: mutateActivateUser, isPending: isPendingActivateUser } = useMutation<
    components['schemas']['UserDTOSchema'],
    OpenApiError,
    paths['/v1/user/activate']['patch']['requestBody']['content']['application/json']
  >({
    mutationFn: (body) => apiClient.user.activate(body),
  });

  const onPressActivateUser = useCallback(() => {
    mutateActivateUser(
      {
        type: 'activate',
        authCode: confirmText,
        email: route.params.email,
      },
      {
        onSuccess: () => {
          show({
            autoHide: true,
            duration: 2000,
            message: '계정이 복구되었어요! 이제 로그인이 가능해요.',
            type: 'info',
          });
          setTimeout(async () => {
            navigation.popToTop();
          }, 2000);
        },
        onError: (error) => {
          let message = '복구 도중 오류가 발생했어요';
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
            type: 'error',
            message,
            autoHide: true,
            duration: 2000,
          });
        },
      }
    );
  }, [mutateActivateUser, confirmText, navigation, route.params.email, show]);
  return (
    <CommonScreenLayout>
      <TextInput
        placeholder="인증번호를 입력해주세요"
        keyboardType="number-pad"
        style={[styles.textInput, { marginTop: topInset }]}
        onChangeText={(text) => setConfirmText(text)}
      />
      <Button
        style={[
          {
            backgroundColor: colors.oc.indigo[8].value,
          },
          styles.button,
        ]}
        onPress={onPressActivateUser}
      >
        {'계정 복구하기'}
      </Button>
      {isPendingActivateUser && <Spinner />}
    </CommonScreenLayout>
  );
};

export const ActivateUserConfirmScreen = () => {
  return (
    <ToastVisibleContextProvider>
      <Screen />
    </ToastVisibleContextProvider>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 16,
  },
  button: {
    marginTop: 12,
    marginHorizontal: 16,
  },
});
