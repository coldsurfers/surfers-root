import type { CSSProperties, DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

export type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label?: string;
  labelStyle?: CSSProperties;
  noResize?: boolean;
  isError?: boolean;
};
