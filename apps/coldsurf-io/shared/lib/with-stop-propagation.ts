export const withStopPropagation = <T extends React.SyntheticEvent>(
  handler?: (event: T) => void
) => {
  return (event: T) => {
    event.stopPropagation();
    event.preventDefault();

    handler?.(event);
  };
};
