import type { CSSProperties, InputHTMLAttributes } from 'react';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelStyle?: CSSProperties;
};
