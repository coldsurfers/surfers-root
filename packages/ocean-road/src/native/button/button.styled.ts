import color from '@coldsurfers/design-tokens/dist/js/color/variables'
import styled, { css } from '@emotion/native'
import { ButtonTheme } from '../../button/button.types'
import { getButtonBackgroundColor, getButtonForegroundColor } from '../../button/button.utils'
import { colors } from '../../tokens'

export const StyledButton = styled.TouchableOpacity<{
  colorTheme: ButtonTheme
  size: 'md' | 'sm'
}>`
  align-items: center;
  justify-content: center;
  background-color: ${({ colorTheme, disabled }) =>
    disabled ? color.oc.gray[4].value : getButtonBackgroundColor(colorTheme)};
  padding: ${(props) => {
    switch (props.size) {
      case 'md':
        return '14px'
      case 'sm':
        return '10px'
      default:
        return '14px;'
    }
  }};
  border-radius: ${(props) => {
    switch (props.size) {
      case 'md':
        return '22px'
      case 'sm':
        return '16px'
      default:
        return '22px'
    }
  }};
  ${(props) => css`
    border-width: ${props.colorTheme === 'border' && '2px'};
    border-color: ${props.colorTheme === 'border' && colors.oc.black.value};
  `}

  font-family: inherit;

  opacity: ${(props) => (props.colorTheme === 'transparentDarkGray' ? 0.5 : 1.0)};
`

export const StyledButtonText = styled.Text<{ colorTheme: ButtonTheme; size: 'md' | 'sm' }>`
  font-weight: 700;
  color: ${({ colorTheme }) => getButtonForegroundColor(colorTheme)};
  font-family: inherit;
  font-size: ${(props) => {
    switch (props.size) {
      case 'md':
        return '14px'
      case 'sm':
        return '12px'
      default:
        return '14px'
    }
  }};
`
