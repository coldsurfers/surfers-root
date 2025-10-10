import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import FastImage from '@d11/react-native-fast-image';
import { format } from 'date-fns';
import { forwardRef } from 'react';
import { View } from 'react-native';

type Props = {
  thumbnailUrl: string;
  title: string;
  venue: string;
  date: string;
};

export const ConcertDetailShareView = forwardRef<View, Props>(
  ({ thumbnailUrl, title, venue, date }, ref) => {
    const { semantics } = useColorScheme();
    return (
      <View
        ref={ref}
        collapsable={false}
        style={{
          paddingVertical: 18,
          backgroundColor: semantics.background[2],
          borderRadius: 18,
          width: 250,
          alignItems: 'center',
        }}
      >
        <FastImage
          source={{ uri: thumbnailUrl }}
          resizeMode="contain"
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: semantics.background[1],
          }}
        />
        <View style={{ alignItems: 'flex-start', width: '100%' }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: semantics.foreground[1],
              fontSize: 16,
              marginTop: 12,
              paddingHorizontal: 12,
              textAlign: 'left',
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontWeight: '600',
              color: semantics.foreground[4],
              fontSize: 14,
              paddingHorizontal: 12,
              textAlign: 'left',
            }}
          >
            {venue} ({format(new Date(date), 'MMM dd, hh:mm a')})
          </Text>
          <Text
            style={{
              fontWeight: '600',
              color: semantics.foreground[2],
              fontSize: 14,
              marginTop: 8,
              paddingHorizontal: 12,
              textAlign: 'left',
            }}
          >
            shared by COLDSURF
          </Text>
        </View>
      </View>
    );
  }
);
