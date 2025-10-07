import { useColorScheme } from '@coldsurfers/ocean-road/native';
import { DanceIcon, MicVocalIcon, TheatreIcon } from './event-category-list.styled';

// @TODO: same name with coldsurf-io
export const getUiIcon = (name: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { semantics } = useColorScheme();
  switch (name) {
    case 'Gigs':
      return <MicVocalIcon size={14} color={semantics.foreground[1]} />;
    case 'Theatre':
      return <TheatreIcon size={14} color={semantics.foreground[1]} />;
    case 'Dance':
      return <DanceIcon size={14} color={semantics.foreground[1]} />;
    default:
      return '';
  }
};
