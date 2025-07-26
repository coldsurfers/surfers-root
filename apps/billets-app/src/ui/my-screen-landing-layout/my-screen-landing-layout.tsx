import { withHapticPress } from '@/lib';
import { colors } from '@coldsurfers/ocean-road';
import { Button, Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { CommonScreenLayout } from '../common-screen-layout';

export const MyScreenLandingLayout = memo(
  ({ onPressLoginButton }: { onPressLoginButton: () => void }) => {
    const { semantics } = useColorScheme();
    return (
      <CommonScreenLayout style={styles.wrapper}>
        <Text weight="bold" style={[styles.loginText, { color: semantics.foreground[1] }]}>
          {'🎉\n예정된 많은\n공연을\n놓치지 마세요'}
        </Text>
        <Text style={[styles.loginSubText, { color: semantics.foreground[3] }]}>
          {'로그인 후 찜하기를 사용해보세요'}
        </Text>
        <Button style={styles.loginButton} onPress={withHapticPress(onPressLoginButton)}>
          로그인 / 회원가입
        </Button>
      </CommonScreenLayout>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: colors.oc.cyan[8].value,
    marginTop: 16,
  },
  loginText: { fontSize: 24, textAlign: 'center' },
  loginSubText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
});
