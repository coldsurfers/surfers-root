import { colors } from '@coldsurfers/ocean-road';
import { Text } from '@coldsurfers/ocean-road/native';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import type { ConcertMapMarkerProps } from './concert-map-marker.types';

export const ConcertMapMarker = memo(({ clusters }: ConcertMapMarkerProps) => {
  return (
    <>
      {clusters.map((point) => {
        const { properties, geometry } = point;
        const [longitude, latitude] = geometry.coordinates;

        if (properties.cluster) {
          return (
            <Marker key={`cluster-${properties.cluster_id}`} coordinate={{ latitude, longitude }}>
              <View style={styles.circleMarker}>
                <Text weight="bold" style={styles.markerText}>
                  {properties.point_count}
                </Text>
              </View>
            </Marker>
          );
        }

        return (
          <Marker
            key={properties.cluster_id}
            coordinate={{ latitude, longitude }}
            // Add your custom marker component or image here
          >
            <View style={styles.circleMarker} />
          </Marker>
        );
      })}
    </>
  );
});

const styles = StyleSheet.create({
  circleMarker: {
    backgroundColor: colors.oc.blue[8].value,
    borderRadius: 20,
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: { color: colors.oc.white.value, fontSize: 14 },
});
