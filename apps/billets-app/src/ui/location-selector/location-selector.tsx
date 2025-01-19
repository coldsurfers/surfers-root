import commonStyles from '@/lib/common-styles'
import { colors } from '@coldsurfers/ocean-road'
import { useColorScheme } from '@coldsurfers/ocean-road/native'
import { MapPin } from 'lucide-react-native'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export const LocationSelector = ({ onPress }: { onPress: () => void }) => {
  const { semantics } = useColorScheme()
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={onPress}
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
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { display: 'flex', flexDirection: 'row', paddingBottom: 12 },
  button: {
    padding: 8,
    marginLeft: 12,
    backgroundColor: colors.oc.white.value,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.shadowBox,
  },
})
