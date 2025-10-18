import { withHapticPress } from '@/lib';
import { AppleLogo, GoogleLogo } from '@/lib/icons';
import { colors } from '@coldsurfers/ocean-road';
import { Button, Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { memo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { CommonScreenLayout } from '../common-screen-layout';

const GOOGLE_COLOR = '#4284F3';

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
      {Platform.OS === 'ios' && (
        <Button
          leftIcon={<AppleLogo width={16} height={16} fill={semantics.background[1]} />}
          style={[
            styles.loginButton,
            {
              backgroundColor: colors.oc.black.value,
            },
          ]}
          onPress={withHapticPress(() => {})}
        >
          Apple로 계속하기
        </Button>
      )}
      <Button
        leftIcon={<GoogleLogo width={16} height={16} fill={semantics.background[1]} />}
        style={[
          styles.loginButton,
          {
            backgroundColor: GOOGLE_COLOR,
          },
        ]}
        onPress={withHapticPress(() => {})}
      >
        Google로 계속하기
      </Button>
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
