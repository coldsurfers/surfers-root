import color from '@coldsurfers/design-tokens/dist/js/color/variables'
import styled from '@emotion/native'
import { ButtonTheme } from '../../button/button.types'
import { getButtonBackgroundColor, getButtonForegroundColor } from '../../button/button.utils'

export const StyledButton = styled.TouchableOpacity<{
  colorTheme: ButtonTheme
}>`
  align-items: center;
  justify-content: center;
  background-color: ${({ colorTheme, disabled }) =>
    disabled ? color.oc.gray[4].value : getButtonBackgroundColor(colorTheme)};
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 24px;
  border: ${({ colorTheme, disabled }) =>
    `1px solid ${disabled ? color.oc.gray[4].value : getButtonBackgroundColor(colorTheme)}`};
  font-family: inherit;

  opacity: ${(props) => (props.colorTheme === 'transparentDarkGray' ? 0.5 : 1.0)};
`

export const StyledButtonText = styled.Text<{ colorTheme: ButtonTheme }>`
  font-weight: 700;
  color: ${({ colorTheme }) => getButtonForegroundColor(colorTheme)};
  font-family: inherit;
`
