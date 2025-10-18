import { ToastVisibleContext } from '@/lib/contexts';
import { AppleLogo } from '@/lib/icons';
import { withHapticPress } from '@/lib/with-haptic-press';
import { useMyScreenNavigation } from '@/screens';
import { colors } from '@coldsurfers/ocean-road';
import { Button, Spinner } from '@coldsurfers/ocean-road/native';
import { decodeJwt } from '@coldsurfers/shared-utils';
import appleAuth from '@invertase/react-native-apple-authentication';
import { useCallback, useContext } from 'react';
import { Alert, Platform, StyleSheet } from 'react-native';
import { useSignIn } from '../hooks/useSignIn';

export const AppleLoginButton = () => {
  const { navigate } = useMyScreenNavigation();
  const { show } = useContext(ToastVisibleContext);

  const { mutate: mutateSignIn, isPending: isPendingMutateSignIn } = useSignIn({
    onSuccess: () => {
      navigate('MainTabNavigation', {
        screen: 'HomeStackNavigation',
        params: {
          screen: 'HomeScreen',
          params: {},
        },
      });
    },
  });

  const onPressAppleLogin = useCallback(async () => {
    if (Platform.OS !== 'ios') {
      return;
    }
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { email: appleEmail, identityToken } = appleAuthRequestResponse;
        if (!identityToken) {
          return;
        }
        const email = appleEmail ?? decodeJwt(identityToken)?.email;
        if (!email) {
          return;
        }
        mutateSignIn(
          {
            provider: 'apple',
            email: email,
            token: identityToken,
            platform: Platform.select({
              ios: 'ios',
              android: 'android',
              default: 'android',
            }),
          },
          {
            onError: (error) => {
              if (error.code === 'USER_DEACTIVATED') {
                Alert.alert(
                  '탈퇴 처리된 계정',
                  '탈퇴 처리 된 계정이에요. 하지만 복구할 수 있어요!',
                  [
                    {
                      text: '복구하기',
                      style: 'default',
                      onPress: () => {
                        navigate('LoginStackNavigation', {
                          screen: 'EmailSignupScreen',
                          params: {
                            type: 'activate-user',
                          },
                        });
                      },
                    },
                    {
                      text: '취소',
                      style: 'cancel',
                    },
                  ]
                );
                return;
              }
              show({
                type: 'error',
                message: '애플 로그인 중 오류가 발생했어요',
                autoHide: true,
                duration: 5000,
              });
            },
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  }, [mutateSignIn, navigate, show]);

  return (
    <>
      <Button
        leftIcon={<AppleLogo width={16} height={16} fill={colors.oc.white.value} />}
        style={[
          styles.loginButton,
          {
            backgroundColor: colors.oc.black.value,
          },
        ]}
        onPress={withHapticPress(onPressAppleLogin)}
      >
        Apple로 계속하기
      </Button>
      {isPendingMutateSignIn ? <Spinner positionCenter /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: colors.oc.cyan[8].value,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
