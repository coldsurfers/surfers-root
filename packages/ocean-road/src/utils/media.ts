import { type SerializedStyles, css } from '@emotion/react';
import breakpoints from './breakpoints';

type BreakpointKey = keyof typeof breakpoints;

// Define a type-safe media query utility
const media: Record<BreakpointKey, (styles: SerializedStyles | string) => SerializedStyles> =
  Object.keys(breakpoints).reduce(
    (acc, label) => {
      const breakpointLabel = label as BreakpointKey;

      acc[breakpointLabel] = (styles) => css`
      @media (max-width: ${breakpoints[breakpointLabel]}px) {
        ${styles}
      }
    `;

      return acc;
    },
    {} as Record<BreakpointKey, (styles: SerializedStyles | string) => SerializedStyles>
  );

export default media;
