import { StyleSheet } from 'react-native'
import { variables } from './tokens/ts/variables'

export const buttonBackgroundColorStyles = StyleSheet.create({
  transparent: {
    backgroundColor: 'transparent',
  },
  transparentDarkGray: {
    backgroundColor: variables.palette.black,
    opacity: 0.5,
  },
  white: {
    backgroundColor: variables.palette.white,
  },
  pink: {
    backgroundColor: variables.palette.pink,
  },
  indigo: {
    backgroundColor: variables.palette.indigo,
  },
})
