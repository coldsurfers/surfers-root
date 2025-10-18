import { AppleLoginButton } from '@/features/auth/components/AppleLoginButton';
import { GoogleLoginButton } from '@/features/auth/components/GoogleLoginButton';
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { memo } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { CommonScreenLayout } from '../common-screen-layout';

export const MyScreenLoginForm = memo(() => {
  const { semantics } = useColorScheme();
  return (
    <CommonScreenLayout style={styles.wrapper}>
      <Text weight="bold" style={[styles.loginText, { color: semantics.foreground[1] }]}>
        {'Log in / Sign up'}
      </Text>
      <Text style={[styles.loginSubText, { color: semantics.foreground[3] }]}>
        {'1초만에 가입하고 내 창꼬 만들기'}
      </Text>
      <View style={styles.socialLoginButtonWrapper}>
        {Platform.OS === 'ios' && <AppleLoginButton />}
        <GoogleLoginButton />
      </View>
    </CommonScreenLayout>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: { fontSize: 24, textAlign: 'center' },
  loginSubText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 28,
  },
  socialLoginButtonWrapper: {
    marginTop: 20,
    gap: 8,
    width: Dimensions.get('window').width * 0.8,
  },
});
