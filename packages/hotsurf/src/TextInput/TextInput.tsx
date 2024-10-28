import React, { memo, useCallback, useState } from 'react'
import { StyleSheet, TextInput as RNTextInput, TextInputProps } from 'react-native'
import { variables } from '../lib/tokens/ts/variables'

interface Props extends TextInputProps {}

const TextInput = (props: Props) => {
  const [focused, setFocused] = useState<boolean>(false)
  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])
  const onBlur = useCallback(() => {
    setFocused(false)
  }, [])
  return (
    <RNTextInput
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
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#b0b6b7',
    borderWidth: 2,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: variables.palette.white,
  },
  focused: {
    borderColor: '#595b5b',
  },
  disabled: {
    backgroundColor: '#f4eded',
  },
})

export default memo(TextInput)
