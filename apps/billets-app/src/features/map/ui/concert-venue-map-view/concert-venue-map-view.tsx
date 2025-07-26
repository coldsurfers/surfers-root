import { Text } from '@coldsurfers/ocean-road/native';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { type LatLng, type MapPressEvent, Marker, type Region } from 'react-native-maps';
import {
  CONCERT_VENUE_MAP_HEIGHT_LARGE,
  CONCERT_VENUE_MAP_HEIGHT_MEDIUM,
} from './concert-venue-map.constants';

export const ConcertVenueMapView = ({
  region,
  scrollEnabled = true,
  onPress,
  size = 'medium',
  markerCoordinate,
}: {
  region: Region;
  scrollEnabled?: boolean;
  onPress?: (event: MapPressEvent) => void;
  size?: 'medium' | 'large';
  markerCoordinate: LatLng;
}) => {
  return (
    <MapView
      region={region}
      scrollEnabled={scrollEnabled}
      onPress={onPress}
      style={[
        styles.venueMap,
        {
          height:
            size === 'medium' ? CONCERT_VENUE_MAP_HEIGHT_MEDIUM : CONCERT_VENUE_MAP_HEIGHT_LARGE,
        },
      ]}
    >
      <Marker coordinate={markerCoordinate}>
        <Text style={styles.venueMapMarker}>{'📍'}</Text>
      </Marker>
    </MapView>
  );
};

const styles = StyleSheet.create({
  venueMap: {
    width: Dimensions.get('screen').width - 12 * 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    marginTop: 4,
  },
  venueMapMarker: {
    fontSize: 24,
  },
});
