import { GOOGLE_SIGNIN_OPTIONS } from '@/lib/constants';
import { ToastVisibleContext } from '@/lib/contexts';
import { GoogleLogo } from '@/lib/icons';
import { withHapticPress } from '@/lib/with-haptic-press';
import { useMyScreenNavigation } from '@coldsurfers/navigation-utils';
import { colors } from '@coldsurfers/ocean-road';
import { Button, Spinner, useColorScheme } from '@coldsurfers/ocean-road/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useCallback, useContext } from 'react';
import { Alert, Platform, StyleSheet } from 'react-native';
import { useSignIn } from '../hooks/useSignIn';

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

export const GoogleLoginButton = () => {
  const { semantics } = useColorScheme();
  const { show } = useContext(ToastVisibleContext);
  const { navigate } = useMyScreenNavigation();

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
      const { user, idToken } = signInResponse.data;

      const { email } = user;
      if (!idToken) {
        // @TODO: add throw error or capture error
        return;
      }

      mutateSignIn(
        {
          provider: 'google',
          email,
          token: idToken,
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

  return (
    <>
      <Button
        leftIcon={<GoogleLogo width={16} height={16} fill={semantics.background[1]} />}
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
      {isPendingMutateSignIn ? <Spinner positionCenter /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: colors.oc.cyan[8].value,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
  },
});
