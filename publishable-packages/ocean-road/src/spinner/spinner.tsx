import { StyledPageLoadingWrapper, StyledSpinner } from './spinner.styled';
import type { SpinnerVariant } from './spinner.types';

const RotateSpinner = () => {
  return (
    <StyledSpinner
      animate={{
        rotate: 360, // Rotates the element 360 degrees
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY, // Loops the animation infinitely
        duration: 0.5, // Each full rotation takes 2 seconds
        ease: 'linear', // Smooth, constant speed
      }}
    />
  );
};

export const Spinner = ({ variant }: { variant?: SpinnerVariant }) => {
  switch (variant) {
    case 'page-overlay':
      return (
        <StyledPageLoadingWrapper>
          <RotateSpinner />
        </StyledPageLoadingWrapper>
      );
    default:
      return <RotateSpinner />;
  }
};
