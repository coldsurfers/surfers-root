import { apiClient } from '@/lib/api/openapi-client'
import { CommonImageViewer } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Modal, Text } from '@coldsurfers/ocean-road/native'
import { useQuery } from '@tanstack/react-query'
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
  const { data: profileImages, isLoading } = useQuery({
    queryKey: apiClient.queryKeys.artistProfileImage.listByArtistId(artistId),
    queryFn: () => apiClient.artistProfileImage.getArtistProfileImagesByArtistId(artistId),
  })
  const { data: copyright } = useQuery({
    queryKey: apiClient.queryKeys.copyright.detailByArtistProfileImageId(artistId),
    queryFn: () => apiClient.copyright.getCopyrightByArtistProfileImageId(artistId),
  })
  const firstImage = useMemo(() => {
    return profileImages?.at(0)
  }, [profileImages])
  const firstImageCaption = useMemo(() => {
    if (!copyright) {
      return undefined
    }
    const { license, owner, licenseURL } = copyright
    return `© ${owner}, ${license} (${licenseURL}).`
  }, [copyright])

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
            <CommonImageViewer imageUri={firstImage?.url ?? ''} caption={firstImageCaption} />
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
