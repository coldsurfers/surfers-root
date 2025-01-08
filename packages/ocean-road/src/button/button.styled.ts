import styled from '@emotion/styled'
import { ButtonTheme } from './button.types'
import { getButtonBackgroundColor, getButtonForegroundColor } from './button.utils'

export const StyledButton = styled.button<{
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
  border: none;
  font-family: inherit;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  opacity: ${(props) => (props.colorTheme === 'transparentDarkGray' ? 0.5 : 1.0)};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.75;
  }

  &:active {
    opacity: 0.5;
  }
`

export const StyledButtonText = styled.p<{ colorTheme: ButtonTheme }>`
  font-weight: 700;
  color: ${({ colorTheme }) => getButtonForegroundColor(colorTheme)};
  font-family: inherit;
  margin: unset;
`
