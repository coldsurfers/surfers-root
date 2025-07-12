import { useEffect } from 'react';

export const usePreventScrollEffect = ({
  shouldPrevent,
}: {
  shouldPrevent: boolean;
}) => {
  useEffect(() => {
    const { body } = document;
    if (shouldPrevent) {
      body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      body.style.overflow = ''; // Reset overflow to enable scrolling
    }
    return () => {
      body.style.overflow = ''; // Clean up on unmount
    };
  }, [shouldPrevent]);
};
