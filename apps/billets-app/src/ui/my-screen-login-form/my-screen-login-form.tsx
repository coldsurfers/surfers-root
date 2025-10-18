import { AppleLoginButton } from '@/features/auth/components/AppleLoginButton';
import { GoogleLoginButton } from '@/features/auth/components/GoogleLoginButton';
import { colors } from '@coldsurfers/ocean-road';
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { memo } from 'react';
import { Platform, StyleSheet } from 'react-native';
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
      {Platform.OS === 'ios' && <AppleLoginButton />}
      <GoogleLoginButton />
    </CommonScreenLayout>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: colors.oc.cyan[8].value,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
  },
  loginText: { fontSize: 24, textAlign: 'center' },
  loginSubText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
});
