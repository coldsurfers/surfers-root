import { useArtistDetailQuery } from '@/lib/react-query'
import { CommonImageViewer } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Modal, Text } from '@coldsurfers/ocean-road/native'
import { useMemo } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const ArtistProfileImageModal = ({
  visible,
  onClose,
  artistId,
}: {
  visible: boolean
  onClose: () => void
  artistId: string
}) => {
  const { top: topInset } = useSafeAreaInsets()
  const { data, isLoading } = useArtistDetailQuery({ id: artistId })
  const firstImage = useMemo(() => {
    return data?.artistProfileImage.at(0)
  }, [data?.artistProfileImage])
  const firstImageCaption = useMemo(() => {
    if (!firstImage?.copyright) {
      return undefined
    }
    const { license, owner, licenseURL } = firstImage.copyright
    return `© ${owner}, ${license} (${licenseURL}).`
  }, [firstImage?.copyright])

  return (
    <Modal visible={visible}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator animating />
        </View>
      ) : (
        <View style={styles.contentWrapper}>
          <Pressable
            hitSlop={{
              top: 20,
              left: 20,
              right: 20,
              bottom: 20,
            }}
            onPress={onClose}
            style={[styles.imageViewerCloseButton, { top: topInset }]}
          >
            <Text style={styles.imageViewerCloseText}>닫기</Text>
          </Pressable>
          <View style={styles.imageContainer}>
            <CommonImageViewer imageUri={firstImage?.imageURL ?? ''} caption={firstImageCaption} />
          </View>
        </View>
      )}
    </Modal>
  )
}

const styles = StyleSheet.create({
  imageViewerCloseButton: { position: 'absolute', zIndex: 99, right: 12 },
  imageViewerCloseText: { color: '#ffffff' },
  imageContainer: {},
  caption: {
    color: colors.oc.gray[2].value,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.oc.black.value,
  },
  contentWrapper: {
    backgroundColor: colors.oc.black.value,
  },
})
