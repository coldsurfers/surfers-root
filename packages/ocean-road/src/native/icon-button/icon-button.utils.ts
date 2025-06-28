import color from '@coldsurfers/design-tokens/dist/js/color/variables';
import { css } from '@emotion/native';
import type { ButtonTheme } from '../../button';
import type { IconButtonSize } from './icon-button.types';

export const sizes = {
  xs: 20,
  sm: 24,
  md: 28,
  lg: 32,
  xl: 36,
};

const sizesStringify = (size: IconButtonSize) => {
  switch (size) {
    case 'xs':
      return `${sizes.xs}px`;
    case 'sm':
      return `${sizes.sm}px`;
    case 'md':
      return `${sizes.md}px`;
    case 'lg':
      return `${sizes.lg}px`;
    case 'xl':
      return `${sizes.xl}px`;
    default:
      return `${sizes.xs}px`;
  }
};

const xsStyles = css`
  width: ${sizesStringify('xs')};
  height: ${sizesStringify('xs')};
  border-radius: 10px;
`;

const smStyles = css`
  width: ${sizesStringify('sm')};
  height: ${sizesStringify('sm')};
  border-radius: 12px;
`;

const mdStyles = css`
  width: ${sizesStringify('md')};
  height: ${sizesStringify('md')};
  border-radius: 14px;
`;

const lgStyles = css`
  width: ${sizesStringify('lg')};
  height: ${sizesStringify('lg')};
  border-radius: 16px;
`;

const xlStyles = css`
  width: ${sizesStringify('xl')};
  height: ${sizesStringify('xl')};
  border-radius: 18px;
`;

export const getIconButtonSizeStyles = (size: IconButtonSize) => {
  switch (size) {
    case 'xs':
      return xsStyles;
    case 'sm':
      return smStyles;
    case 'md':
      return mdStyles;
    case 'lg':
      return lgStyles;
    case 'xl':
      return xlStyles;
    default:
      return xsStyles;
  }
};

const transparentStyles = css`
  background-color: transparent;
`;

const transparentDarkGrayStyles = css`
  background-color: ${color.oc.black.value};
  opacity: 0.5;
`;

const whiteStyles = css`
  background-color: ${color.oc.white.value};
`;

const pinkStyles = css`
  background-color: ${color.oc.pink[9].value};
`;

const indigoStyles = css`
  background-color: ${color.oc.indigo[9].value};
`;

export const getIconButtonBackgroundStyles = (theme: ButtonTheme) => {
  switch (theme) {
    case 'transparent':
      return transparentStyles;
    case 'transparentDarkGray':
      return transparentDarkGrayStyles;
    case 'white':
      return whiteStyles;
    case 'pink':
      return pinkStyles;
    case 'indigo':
      return indigoStyles;
    default:
      return indigoStyles;
  }
};
