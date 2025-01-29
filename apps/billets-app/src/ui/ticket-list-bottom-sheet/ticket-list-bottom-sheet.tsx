import commonStyles from '@/lib/common-styles'
import { components } from '@/types/api'
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { forwardRef } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TicketItem } from '../ticket-item'

const ESTIMATED_ITEM_HEIGHT = 522

export const TicketListBottomSheet = forwardRef<
  BottomSheetModal,
  {
    onPressBackdrop?: () => void
    tickets: components['schemas']['TicketDTOSchema'][]
  }
>(({ onPressBackdrop, tickets }, ref) => {
  const { semantics } = useColorScheme()
  const { bottom: bottomInset } = useSafeAreaInsets()
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        snapPoints={[ESTIMATED_ITEM_HEIGHT * tickets.length, '80%']}
        handleStyle={[
          styles.handle,
          {
            backgroundColor: semantics.background[3],
          },
        ]}
        handleIndicatorStyle={{
          backgroundColor: semantics.foreground[1],
        }}
        backgroundStyle={{
          backgroundColor: semantics.background[3],
        }}
        backdropComponent={(props) => {
          return <Pressable {...props} onPress={onPressBackdrop} style={styles.backdrop} />
        }}
      >
        <BottomSheetView style={{ backgroundColor: semantics.background[3], paddingBottom: bottomInset + 24 }}>
          <View
            style={{
              paddingTop: 12,
              paddingBottom: 12,
              borderBottomColor: semantics.border[1],
              borderBottomWidth: 1,
            }}
          >
            <Text weight="bold" style={[styles.info, { color: semantics.foreground[1] }]}>
              티켓 정보
            </Text>
          </View>
          <View style={styles.content}>
            {tickets.map((ticket) => (
              <TicketItem key={ticket.id} {...ticket} />
            ))}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
})

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  handle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    ...commonStyles.topShadowBox,
  },
  info: {
    fontSize: 14,
    textAlign: 'center',
  },
  content: { paddingTop: 8 },
})
