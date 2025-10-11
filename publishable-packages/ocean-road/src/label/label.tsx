import { type LabelHTMLAttributes, forwardRef } from 'react';
import { Text } from '../text';
import { StyledRequiredLabelMark } from './label.styled';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: string;
  required?: boolean;
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ htmlFor, style, children, required, ...otherProps }, ref) => {
    return (
      <label
        ref={ref}
        {...otherProps}
        htmlFor={htmlFor}
        style={{ marginTop: '1.5rem', marginBottom: '0.5rem', ...style }}
      >
        <Text as="p" style={{ margin: 'unset' }}>
          {children} {required && <StyledRequiredLabelMark as="span">*</StyledRequiredLabelMark>}
        </Text>
      </label>
    );
  }
);
