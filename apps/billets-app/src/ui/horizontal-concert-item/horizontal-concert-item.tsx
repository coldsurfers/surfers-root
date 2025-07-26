import { colors } from '@coldsurfers/ocean-road';
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import type { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const HorizontalConcertItem = ({
  onPress,
  thumbnailComponent,
  title,
  subtitle,
  description,
  bottomRightAddOn,
}: {
  onPress?: () => void;
  thumbnailComponent: ReactNode;
  title: string;
  subtitle: string;
  description: string;
  bottomRightAddOn?: ReactNode;
}) => {
  const { semantics } = useColorScheme();
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemWrapper}>
      {thumbnailComponent}
      <View style={styles.itemInnerRight}>
        <Text
          weight="bold"
          numberOfLines={1}
          style={[styles.textTitle, { color: semantics.foreground[1] }]}
        >
          {title}
        </Text>
        <Text weight="medium" style={[styles.text, { color: semantics.foreground[3] }]}>
          {subtitle}
        </Text>
        <Text weight="medium" style={[styles.textDescription, { color: semantics.foreground[2] }]}>
          {description}
        </Text>
      </View>
      {bottomRightAddOn && <View style={styles.bottomRight}>{bottomRightAddOn}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemInnerRight: {
    marginLeft: 8,
    flex: 1,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  text: {
    fontSize: 14,
    color: colors.oc.gray[7].value,
  },
  textDescription: {
    color: colors.oc.gray[8].value,
    fontSize: 14,
  },
  textTitle: {
    color: colors.oc.black.value,
    fontSize: 14,
  },
});
