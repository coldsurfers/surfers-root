import { PropsWithChildren } from 'react'
import { GestureResponderEvent } from 'react-native'

export type ModalProps = PropsWithChildren<{
  visible?: boolean
  transparent?: boolean
  onPressBackground?: (event: GestureResponderEvent) => void
}>
