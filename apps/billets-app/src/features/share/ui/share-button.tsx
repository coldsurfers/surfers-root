import { colors } from '@coldsurfers/ocean-road';
import { IconButton } from '@coldsurfers/ocean-road/native';

type Props = {
  onPress?: () => void;
};

export const ShareButton = ({ onPress }: Props) => {
  return (
    <IconButton
      onPress={onPress}
      style={{ backgroundColor: colors.oc.gray[4].value, width: 24, height: 24 }}
      icon="Share"
      size="md"
      color={colors.oc.cyan[9].value}
      strokeWidth={2.5}
      fill={'transparent'}
    />
  );
};
