import { type InputHTMLAttributes, forwardRef, memo } from 'react';
import { Text } from '../text';
import { StyledCheckboxIcon, StyledCheckboxInput, StyledCheckboxLabel } from './checkbox.styled';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: 'lg' | 'md' | 'sm';
  labelText?: string;
};

export const Checkbox = memo(
  forwardRef<HTMLInputElement, CheckboxProps>(
    ({ size = 'md', labelText, style, ...otherProps }, ref) => {
      return (
        <StyledCheckboxLabel style={style}>
          <StyledCheckboxInput ref={ref} type="checkbox" $size={size} {...otherProps} />
          <StyledCheckboxIcon size={size} width={undefined} height={undefined} />
          <Text as="p" style={{ margin: 'unset' }}>
            {labelText}
          </Text>
        </StyledCheckboxLabel>
      );
    }
  )
);
