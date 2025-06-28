import color from '@coldsurfers/design-tokens/dist/js/color/variables';
import { forwardRef, memo, useCallback, useState } from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { colors } from '../../tokens';
import { useColorScheme } from '../contexts';
import type { TextInputProps } from './text-input.types';

const DEFAULT_FONT_SIZE = 12;

const _TextInput = forwardRef<RNTextInput, TextInputProps>(({ style, ...otherProps }, ref) => {
  const { semantics, colorScheme } = useColorScheme();
  const [focused, setFocused] = useState<boolean>(false);
  const flattenedStyle = StyleSheet.flatten(style);
  const lineHeight = (flattenedStyle?.fontSize ?? DEFAULT_FONT_SIZE) * 1.275;
  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);
  const onBlur = useCallback(() => {
    setFocused(false);
  }, []);
  return (
    <RNTextInput
      ref={ref}
      placeholderTextColor={'#b0b6b7'}
      onFocus={onFocus}
      onBlur={onBlur}
      {...otherProps}
      style={[
        styles.textInput,
        {
          color: semantics.foreground[1],
          backgroundColor: semantics.background[4],
          borderColor: colorScheme === 'light' ? semantics.border[2] : semantics.border[1],
        },
        focused && {
          borderColor: colorScheme === 'light' ? semantics.border[1] : semantics.border[2],
        },
        typeof otherProps.editable === 'boolean' && !otherProps.editable && styles.disabled,
        {
          lineHeight,
        },
        style,
      ]}
    />
  );
});

export const TextInput = memo(_TextInput);

const styles = StyleSheet.create({
  textInput: {
    // borderColor: colors.oc.gray[6].value,
    borderWidth: 2,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: color.oc.white.value,
    fontFamily: 'Pretendard',
    includeFontPadding: false,
  },
  focused: {
    borderColor: colors.oc.gray[4].value,
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: '#f4eded',
  },
});
