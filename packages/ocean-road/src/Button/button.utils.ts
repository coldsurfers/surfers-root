import semantic from '@coldsurfers/design-tokens/dist/js/color/semantic/variables'
import color from '@coldsurfers/design-tokens/dist/js/color/variables'
import { ButtonTheme } from './button.types'

export const getButtonBackgroundColor = (colorTheme: ButtonTheme) => {
  switch (colorTheme) {
    case 'indigo':
      return color.oc.indigo[9].value
    case 'pink':
      return color.oc.pink[9].value
    case 'transparent':
      return 'transparent'
    case 'transparentDarkGray':
      return color.oc.black.value
    case 'white':
      return color.oc.white.value
    default:
      return color.oc.indigo[9].value
  }
}

export const getButtonForegroundColor = (colorTheme: ButtonTheme) => {
  switch (colorTheme) {
    case 'transparent':
    case 'transparentDarkGray':
    case 'white':
      return semantic.color.foreground[1]
    default:
      return color.oc.white.value
  }
}
