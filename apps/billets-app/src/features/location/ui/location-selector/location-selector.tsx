import commonStyles from '@/lib/common-styles'
import { colors } from '@coldsurfers/ocean-road'
import { MapPin } from 'lucide-react-native'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export const LocationSelector = ({ onPress }: { onPress: () => void }) => (
  <View style={styles.wrapper}>
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{
        top: 12,
        left: 12,
        right: 12,
        bottom: 12,
      }}
      style={styles.button}
    >
      <MapPin size={24} />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  wrapper: { display: 'flex', flexDirection: 'row', paddingBottom: 12 },
  button: {
    marginLeft: 'auto',
    marginRight: 12,
    backgroundColor: colors.oc.white.value,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.shadowBox,
  },
})
