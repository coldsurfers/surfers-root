import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import FastImage from '@d11/react-native-fast-image';
import { format } from 'date-fns';
import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';

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
        style={[styles.container, { backgroundColor: semantics.background[2] }]}
      >
        <FastImage
          source={{ uri: thumbnailUrl }}
          resizeMode="contain"
          style={[styles.thumbnail, { backgroundColor: semantics.background[1] }]}
        />
        <View style={styles.contentWrapper}>
          <Text style={[styles.title, { color: semantics.foreground[1] }]}>{title}</Text>
          <Text style={[styles.venue, { color: semantics.foreground[4] }]}>
            {venue} ({format(new Date(date), 'MMM dd, hh:mm a')})
          </Text>
          <Text style={[styles.description, { color: semantics.foreground[2] }]}>
            shared by COLDSURF
          </Text>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    borderRadius: 18,
    width: 250,
    alignItems: 'center',
  },
  thumbnail: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  contentWrapper: {
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    textAlign: 'left',
  },
  venue: {
    fontWeight: '600',
    fontSize: 14,
    paddingHorizontal: 12,
    textAlign: 'left',
  },
  description: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
    paddingHorizontal: 12,
    textAlign: 'left',
  },
});
