import color from '@coldsurfers/design-tokens/dist/js/color/variables'
import { css } from '@emotion/native'
import { ButtonTheme } from '../../button'
import { IconButtonSize } from './icon-button.types'

const xsStyles = css`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`

const smStyles = css`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`

const mdStyles = css`
  width: 28px;
  height: 28px;
  border-radius: 14px;
`

const lgStyles = css`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`

const xlStyles = css`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`

export const getIconButtonSizeStyles = (size: IconButtonSize) => {
  switch (size) {
    case 'xs':
      return xsStyles
    case 'sm':
      return smStyles
    case 'md':
      return mdStyles
    case 'lg':
      return lgStyles
    case 'xl':
      return xlStyles
    default:
      return xsStyles
  }
}

const transparentStyles = css`
  background-color: transparent;
`

const transparentDarkGrayStyles = css`
  background-color: ${color.oc.black.value};
  opacity: 0.5;
`

const whiteStyles = css`
  background-color: ${color.oc.white.value};
`

const pinkStyles = css`
  background-color: ${color.oc.pink[9].value};
`

const indigoStyles = css`
  background-color: ${color.oc.indigo[9].value};
`

export const getIconButtonBackgroundStyles = (theme: ButtonTheme) => {
  switch (theme) {
    case 'transparent':
      return transparentStyles
    case 'transparentDarkGray':
      return transparentDarkGrayStyles
    case 'white':
      return whiteStyles
    case 'pink':
      return pinkStyles
    case 'indigo':
      return indigoStyles
    default:
      return indigoStyles
  }
}
