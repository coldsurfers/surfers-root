import {
  AuthContext,
  GOOGLE_SIGNIN_OPTIONS,
  ToastVisibleContext,
  ToastVisibleContextProvider,
  withHapticPress,
} from '@/lib';
import { apiClient } from '@/lib/api/openapi-client';
import type { components } from '@/types/api';
import type { LoginProvider } from '@/types/auth';
import { CommonScreenLayout } from '@/ui';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { colors } from '@coldsurfers/ocean-road';
import color from '@coldsurfers/ocean-road-design-tokens/dist/js/color/variables';
import { Button, Spinner } from '@coldsurfers/ocean-road/native';
import { decodeJwt } from '@coldsurfers/shared-utils';
import appleAuth from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useMutation } from '@tanstack/react-query';
import React, { useCallback, useContext } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { useLoginSelectionScreenNavigation } from './login-selection-screen.hooks';

const GOOGLE_COLOR = '#4284F3';

GoogleSignin.configure({
  scopes: [], // what API you want to access on behalf of the user, default is email and profile
  webClientId: Platform.select({
    android: GOOGLE_SIGNIN_OPTIONS.webClientId,
    ios: GOOGLE_SIGNIN_OPTIONS.iosClientId,
  }), // client ID of type WEB for your server (needed to verify user ID and offline access)
  // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: GOOGLE_SIGNIN_OPTIONS.iosClientId, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

export const _LoginSelectionScreen = () => {
  const { show } = useContext(ToastVisibleContext);
  const { login } = useContext(AuthContext);
  const { navigate } = useLoginSelectionScreenNavigation();
  const { mutate: mutateSignIn, isPending: isPendingMutateSignIn } = useMutation<
    components['schemas']['UserWithAuthTokenDTOSchema'],
    OpenApiError,
    {
      email: string;
      password?: string;
      platform?: 'android' | 'ios';
      provider: LoginProvider;
      token?: string;
    }
  >({
    mutationFn: apiClient.auth.signIn,
    onSuccess: async (data, variables) => {
      if (!data) {
        return;
      }
      const { user, authToken } = data;
      await login({
        user,
        authToken,
        analyticsOptions: {
          provider: variables.provider,
        },
      });
      navigate('MainTabNavigation', {
        screen: 'HomeStackNavigation',
        params: {
          screen: 'HomeScreen',
          params: {},
        },
      });
    },
  });

  const onPressEmailLogin = useCallback(() => {
    navigate('EmailLoginScreen', {});
  }, [navigate]);

  const onPressGoogleLogin = useCallback(async () => {
    try {
      // if user has signed in before sign in
      await GoogleSignin.signOut();
      await GoogleSignin.revokeAccess();
    } catch {}
    try {
      // check device has play services
      await GoogleSignin.hasPlayServices();
      const signInResponse = await GoogleSignin.signIn();
      if (signInResponse.type === 'cancelled') {
        return;
      }
      const { user } = signInResponse.data;
      const tokens = await GoogleSignin.getTokens();

      // use firebase id token because on android, idToken is always null
      const credential = auth.GoogleAuthProvider.credential(null, tokens.accessToken);
      const firebaseUser = await auth().signInWithCredential(credential);
      const firebaseIdToken = await firebaseUser.user.getIdToken();

      const { email } = user;
      if (!firebaseIdToken) {
        return;
      }
      mutateSignIn(
        {
          provider: 'google',
          email,
          token: firebaseIdToken,
          platform: Platform.select({
            ios: 'ios',
            android: 'android',
            default: 'android',
          }),
        },
        {
          onError: (error) => {
            if (error.code === 'USER_DEACTIVATED') {
              Alert.alert('탈퇴 처리된 계정', '탈퇴 처리 된 계정이에요. 하지만 복구할 수 있어요!', [
                {
                  text: '복구하기',
                  style: 'default',
                  onPress: () => {
                    navigate('EmailSignupScreen', {
                      type: 'activate-user',
                    });
                  },
                },
                {
                  text: '취소',
                  style: 'cancel',
                },
              ]);
              return;
            }
            show({
              autoHide: true,
              duration: 5000,
              message: '구글 로그인 중 오류가 발생했어요',
              type: 'error',
            });
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  }, [mutateSignIn, navigate, show]);

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
                        navigate('EmailSignupScreen', {
                          type: 'activate-user',
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
    <CommonScreenLayout edges={['bottom']} style={styles.wrapper}>
      <View style={styles.loginBox}>
        <Button
          style={[
            styles.loginButton,
            {
              backgroundColor: color.oc.cyan[8].value,
            },
          ]}
          onPress={withHapticPress(onPressEmailLogin)}
        >
          이메일로 계속하기
        </Button>
        {Platform.OS === 'ios' && (
          <Button
            style={[
              styles.loginButton,
              {
                backgroundColor: colors.oc.black.value,
              },
            ]}
            onPress={withHapticPress(onPressAppleLogin)}
          >
             Apple로 계속하기
          </Button>
        )}
        <Button
          style={[
            styles.loginButton,
            {
              backgroundColor: GOOGLE_COLOR,
            },
          ]}
          onPress={withHapticPress(onPressGoogleLogin)}
        >
          Google로 계속하기
        </Button>
      </View>
      {isPendingMutateSignIn ? <Spinner positionCenter /> : null}
    </CommonScreenLayout>
  );
};

export const LoginSelectionScreen = () => {
  return (
    <ToastVisibleContextProvider>
      <_LoginSelectionScreen />
    </ToastVisibleContextProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
  closeButtonPosition: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
  loginButton: {
    width: 180,
    marginBottom: 12,
  },
});
