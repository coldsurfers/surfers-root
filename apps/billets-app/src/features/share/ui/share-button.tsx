import { colors } from '@coldsurfers/ocean-road';
import { IconButton } from '@coldsurfers/ocean-road/native';
import { StyleSheet } from 'react-native';

type Props = {
  onPress?: () => void;
};

export const ShareButton = ({ onPress }: Props) => {
  return (
    <IconButton
      onPress={onPress}
      style={styles.button}
      icon="Share"
      size="md"
      color={colors.oc.cyan[9].value}
      strokeWidth={2.5}
      fill={'transparent'}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.oc.gray[4].value,
    width: 24,
    height: 24,
  },
});
