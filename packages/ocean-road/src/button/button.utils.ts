import { colors, semantics } from '../tokens';
import type { ButtonTheme } from './button.types';

export const getButtonBackgroundColor = (colorTheme: ButtonTheme) => {
  switch (colorTheme) {
    case 'indigo':
      return colors.oc.indigo[9].value;
    case 'pink':
      return colors.oc.pink[9].value;
    case 'transparent':
      return 'transparent';
    case 'transparentDarkGray':
      return colors.oc.black.value;
    case 'white':
      return colors.oc.white.value;
    // @todo: for now, border type only supports react native, (do not support dark mode)
    case 'border':
      return colors.oc.white.value;
    default:
      return colors.oc.indigo[9].value;
  }
};

export const getButtonForegroundColor = (colorTheme: ButtonTheme) => {
  switch (colorTheme) {
    case 'transparent':
    case 'transparentDarkGray':
    case 'white':
      return semantics.color.foreground[1];
    // @todo: for now, border type only supports react native
    case 'border':
      return colors.oc.black.value;
    default:
      return colors.oc.white.value;
  }
};
