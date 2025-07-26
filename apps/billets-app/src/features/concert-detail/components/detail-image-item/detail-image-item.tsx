import type { components } from '@coldsurfers/api-sdk';
import { useColorScheme } from '@coldsurfers/ocean-road/native';
import FastImage from '@d11/react-native-fast-image';
import { memo, useLayoutEffect, useState } from 'react';
import { Image, View } from 'react-native';

export const DetailImageItem = memo(
  ({
    url,
    isFirst,
    isLast,
  }: components['schemas']['DetailImageDTOSchema'] & {
    isFirst: boolean;
    isLast: boolean;
  }) => {
    const { semantics } = useColorScheme();
    const [aspectRatio, setAspectRatio] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
      if (aspectRatio) {
        return;
      }
      Image.getSize(url, (width, height) => {
        setAspectRatio(`${width} / ${height}`);
      });
    }, [aspectRatio, url]);

    if (!aspectRatio) {
      return null;
    }

    return (
      <View
        style={{
          width: '100%',
          aspectRatio: aspectRatio,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          paddingHorizontal: 12,
        }}
      >
        <FastImage
          source={{ uri: url }}
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: isFirst ? 12 : 0,
            borderTopRightRadius: isFirst ? 12 : 0,
            borderBottomLeftRadius: isLast ? 12 : 0,
            borderBottomRightRadius: isLast ? 12 : 0,
          }}
          onLoad={() => setIsLoading(false)}
          fallback
          resizeMode="stretch"
        />
        {isLoading && (
          <View
            style={{
              backgroundColor: semantics.background[4],
              borderTopLeftRadius: isFirst ? 12 : 0,
              borderTopRightRadius: isFirst ? 12 : 0,
              borderBottomLeftRadius: isLast ? 12 : 0,
              borderBottomRightRadius: isLast ? 12 : 0,
              position: 'absolute',
              top: 0,
              left: 12,
              right: 12,
              bottom: 0,
              zIndex: 99,
            }}
          />
        )}
      </View>
    );
  }
);
