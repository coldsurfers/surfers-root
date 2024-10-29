import {
  Spinner,
  Button,
  palette,
  IconButton,
  TextInput,
} from '@coldsurfers/hotsurf';
import React, {useCallback, useContext, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  ToastVisibleContext,
  ToastVisibleContextProvider,
} from '../lib/contexts/ToastVisibleContext';
import useSendEmailConfirmMutation from '../lib/hooks/mutations/useSendEmailConfirmMutation';
import validateEmail from '../lib/validateEmail';
import palettes from '../lib/palettes';
import {useEmailSignupScreenNavigation} from './EmailSignupScreen.hooks';

const EmailSignupScreen = () => {
  const {show} = useContext(ToastVisibleContext);
  const {goBack, navigate} = useEmailSignupScreenNavigation();
  const {mutate, isPending: isPendingSendConfirmEmail} =
    useSendEmailConfirmMutation({
      onSuccess: data => {
        if (!data) {
          return;
        }
        navigate('EmailConfirmScreen', {
          email: data.email,
        });
      },
      onError: error => {
        let message = '알 수 없는 오류가 발생했어요';
        if (error.status === 409) {
          message = error.message;
        }
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
    mutate({email});
  }, [mutate, email]);
  const onChangeText = useCallback((text: string) => {
    setEmail(text);
    setValidated(validateEmail(text) !== null);
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <IconButton
        onPress={goBack}
        icon="←"
        color="transparentDarkGray"
        style={styles.backButton}
      />
      <TextInput
        autoCapitalize="none"
        onChangeText={onChangeText}
        placeholder="이메일을 입력해주세요"
        style={styles.textInput}
      />
      <Button
        text="다음으로 이동하기"
        color="pink"
        style={[
          {
            backgroundColor: validated
              ? palettes.lightblue[400]
              : palettes.gray[400],
          },
          styles.button,
        ]}
        onPress={onPressNext}
        disabled={!validated}
      />
      {isPendingSendConfirmEmail && <Spinner />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: palette.white,
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

const EmailSignupScreenWithToastProvider = () => {
  return (
    <ToastVisibleContextProvider>
      <EmailSignupScreen />
    </ToastVisibleContextProvider>
  );
};

export default EmailSignupScreenWithToastProvider;
