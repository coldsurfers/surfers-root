import color from '@coldsurfers/design-tokens/dist/js/color/variables'
import { forwardRef, memo, useCallback, useState } from 'react'
import { Platform, TextInput as RNTextInput, StyleSheet } from 'react-native'
import { TextInputProps } from './text-input.types'

const _TextInput = forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const [focused, setFocused] = useState<boolean>(false)
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
      {...props}
      style={[
        props.style,
        styles.textInput,
        focused && styles.focused,
        typeof props.editable === 'boolean' && !props.editable && styles.disabled,
      ]}
    />
  )
})

export const TextInput = memo(_TextInput)

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#b0b6b7',
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
  },
  focused: {
    borderColor: '#595b5b',
  },
  disabled: {
    backgroundColor: '#f4eded',
  },
})
