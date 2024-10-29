import {Text} from '@coldsurfers/hotsurf';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const LocationSelector = ({onPress}: {onPress: () => void}) => (
  <View style={styles.wrapper}>
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{
        top: 12,
        left: 12,
        right: 12,
        bottom: 12,
      }}
      style={styles.button}>
      <Text style={styles.emoji}>📍</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {display: 'flex', flexDirection: 'row'},
  button: {marginLeft: 'auto', marginRight: 12},
  emoji: {fontSize: 24},
});

export default LocationSelector;
