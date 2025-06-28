import { useMemo } from 'react';
import { Image, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { colors } from '../../tokens';
import { useColorScheme } from '../contexts';
import { Text } from '../text';

const PROFILE_THUMBNAIL_SIZE = {
  md: {
    width: 62,
    height: 62,
  },
  sm: {
    width: 42,
    height: 42,
  },
  lg: {
    width: 92,
    height: 92,
  },
} as const;

type ProfileThumbnailProps = {
  size?: 'md' | 'sm' | 'lg';
  type?: 'square' | 'circle';
  emptyBgText: string;
  imageUrl?: string;
  style?: StyleProp<ViewStyle>;
};

export const ProfileThumbnail = ({
  size = 'md',
  emptyBgText,
  imageUrl,
  type = 'square',
  style,
}: ProfileThumbnailProps) => {
  const { semantics } = useColorScheme();
  const sizeStyle = useMemo(() => {
    return PROFILE_THUMBNAIL_SIZE[size];
  }, [size]);
  const borderRadiusStyle = useMemo(() => {
    switch (type) {
      case 'circle':
        return {
          borderRadius: sizeStyle.width / 2,
        };
      case 'square':
        return { borderRadius: 4 };
      default:
        return {
          borderRadius: 4,
        };
    }
  }, [sizeStyle.width, type]);
  return (
    <View
      style={[
        styles.wrapper,
        sizeStyle,
        borderRadiusStyle,
        {
          backgroundColor: semantics.background[4],
        },
        style,
      ]}
    >
      {emptyBgText ? (
        <Text weight="bold" style={styles.bgText}>
          {emptyBgText}
        </Text>
      ) : null}
      {imageUrl && <Image source={{ uri: imageUrl }} style={[styles.image, borderRadiusStyle]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgText: {
    color: colors.oc.white.value,
    position: 'absolute',
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
