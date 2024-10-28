import { View, KeyboardTypeOptions } from 'react-native'
import { Label } from '../Label'
import { TextInput } from '../TextInput'

interface Props {
  title: string
  value: string
  numberOfLines?: number
  multiline?: boolean
  disabled?: boolean
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void
  maxLength?: number
  placeholder?: string
  onFocus?: () => void
  keyboardType?: KeyboardTypeOptions
  secureTextEntry?: boolean
}

export const LabelWithInput = ({
  title,
  value,
  onChangeText,
  numberOfLines,
  multiline,
  maxLength,
  placeholder,
  onFocus,
  disabled,
  keyboardType,
  secureTextEntry,
}: Props) => (
  <View>
    <Label text={title} />
    <TextInput
      autoCapitalize="none"
      value={value}
      onChangeText={onChangeText}
      numberOfLines={numberOfLines}
      multiline={multiline}
      maxLength={maxLength}
      placeholder={placeholder}
      placeholderTextColor="#868e96"
      onFocus={onFocus}
      editable={!disabled}
      keyboardType={keyboardType || 'default'}
      secureTextEntry={secureTextEntry}
    />
  </View>
)
