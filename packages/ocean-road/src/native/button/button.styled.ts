import styled from '@emotion/native'
import { ButtonTheme } from '../../button/button.types'
import { getButtonBackgroundColor, getButtonForegroundColor } from '../../button/button.utils'

export const StyledButton = styled.TouchableOpacity<{
  colorTheme: ButtonTheme
}>`
  align-items: center;
  justify-content: center;
  background-color: ${({ colorTheme }) => getButtonBackgroundColor(colorTheme)};
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 24px;
  border: ${({ colorTheme }) => getButtonBackgroundColor(colorTheme)};
  font-family: inherit;

  opacity: ${(props) => (props.colorTheme === 'transparentDarkGray' ? 0.5 : 1.0)};

  &:active {
    opacity: 0.5;
  }
`

export const StyledButtonText = styled.Text<{ colorTheme: ButtonTheme }>`
  font-weight: 700;
  color: ${({ colorTheme }) => getButtonForegroundColor(colorTheme)};
  font-family: inherit;
`
