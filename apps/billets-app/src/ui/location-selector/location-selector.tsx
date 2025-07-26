import type { UserCurrentLocationType } from '@/features/location/stores';
import { withHapticPress } from '@/lib';
import commonStyles from '@/lib/common-styles';
import { colors } from '@coldsurfers/ocean-road';
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { MapPin } from 'lucide-react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { match } from 'ts-pattern';

type LocationSelectorProps = {
  onPress: () => void;
  cityName: string | null;
  type: UserCurrentLocationType | null;
};

export const LocationSelector = ({ onPress, cityName, type }: LocationSelectorProps) => {
  const { semantics } = useColorScheme();
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={withHapticPress(onPress)}
        hitSlop={{
          top: 12,
          left: 12,
          right: 12,
          bottom: 12,
        }}
        style={[
          styles.button,
          {
            backgroundColor: semantics.background[4],
          },
        ]}
      >
        <MapPin size={24} color={semantics.foreground[1]} />
        <Text
          weight="medium"
          style={[
            styles.cityNameText,
            {
              color: semantics.foreground[1],
            },
          ]}
        >
          {match(type)
            .with('city-location', () => cityName)
            .otherwise(() => '현재 위치')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { display: 'flex', flexDirection: 'row', paddingBottom: 12 },
  button: {
    padding: 8,
    marginLeft: 12,
    backgroundColor: colors.oc.white.value,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.shadowBox,
  },
  cityNameText: {
    marginLeft: 4,
    fontSize: 14,
  },
});
