import color from '@coldsurfers/design-tokens/dist/js/color/variables'
import { forwardRef, memo, useCallback, useState } from 'react'
import { Platform, TextInput as RNTextInput, StyleSheet } from 'react-native'
import { colors } from '../../tokens'
import { TextInputProps } from './text-input.types'

const _TextInput = forwardRef<RNTextInput, TextInputProps>(({ style, ...otherProps }, ref) => {
  const [focused, setFocused] = useState<boolean>(false)
  const flattenedStyle = StyleSheet.flatten(style)
  const lineHeight = (flattenedStyle?.fontSize ?? 0) * 1.275
  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])
  const onBlur = useCallback(() => {
    setFocused(false)
  }, [])
  return (
    <RNTextInput
      ref={ref}
      placeholderTextColor={'#b0b6b7'}
      onFocus={onFocus}
      onBlur={onBlur}
      {...otherProps}
      style={[
        styles.textInput,
        focused && styles.focused,
        typeof otherProps.editable === 'boolean' && !otherProps.editable && styles.disabled,
        {
          lineHeight,
        },
        style,
      ]}
    />
  )
})

export const TextInput = memo(_TextInput)

const styles = StyleSheet.create({
  textInput: {
    borderColor: colors.oc.gray[6].value,
    borderWidth: 2,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: Platform.select({
      android: 10,
      ios: 16,
      default: 10,
    }),
    paddingBottom: Platform.select({
      android: 10,
      ios: 16,
      default: 10,
    }),
    backgroundColor: color.oc.white.value,
    fontFamily: Platform.select({
      ios: 'NotoSansKR-Regular',
      android: 'NotoSansKR-Regular',
      default: 'inherit',
    }),
  },
  focused: {
    borderColor: colors.oc.gray[4].value,
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: '#f4eded',
  },
})
