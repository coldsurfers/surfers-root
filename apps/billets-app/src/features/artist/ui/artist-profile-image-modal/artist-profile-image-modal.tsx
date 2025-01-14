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
  const { data: artistProfileImages, isLoading } = useQuery({
    queryKey: apiClient.artistProfileImage.queryKeys.list({ artistId }),
    queryFn: () => apiClient.artistProfileImage.getList({ artistId }),
  })
  const mainProfileImage = useMemo(() => {
    return artistProfileImages?.at(0) ?? null
  }, [artistProfileImages])
  const { data: artistProfileImageDetail } = useQuery({
    queryKey: mainProfileImage?.id
      ? apiClient.artistProfileImage.queryKeys.detail({ artistProfileImageId: mainProfileImage.id })
      : [],
    queryFn: () => {
      if (mainProfileImage?.id) {
        return apiClient.artistProfileImage.getDetail({ artistProfileImageId: mainProfileImage.id })
      }
      return null
    },
    enabled: !!mainProfileImage?.id,
  })
  const copyrightCaptionText = useMemo(() => {
    if (!artistProfileImageDetail || !artistProfileImageDetail.copyright) {
      return ''
    }

    const { license, owner, licenseURL } = artistProfileImageDetail.copyright
    return `© ${owner}, ${license} (${licenseURL}).`
  }, [artistProfileImageDetail])

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
            <CommonImageViewer imageUri={mainProfileImage?.url ?? ''} caption={copyrightCaptionText} />
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
