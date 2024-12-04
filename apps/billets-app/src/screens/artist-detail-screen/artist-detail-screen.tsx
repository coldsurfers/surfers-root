import { ArtistDetailConcertList, ArtistProfileImageModal } from '@/features'
import { CommonBackIconButton, CommonScreenLayout } from '@/ui'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useArtistDetailScreenNavigation, useArtistDetailScreenRoute } from './artist-detail-screen.hooks'

export const ArtistDetailScreen = () => {
  const route = useArtistDetailScreenRoute()
  const navigation = useArtistDetailScreenNavigation()
  const { top: topInset } = useSafeAreaInsets()
  const [profileImageViewerVisible, setProfileImageViewerVisible] = useState(false)

  return (
    <CommonScreenLayout>
      <CommonBackIconButton top={topInset} onPress={navigation.goBack} />
      <ArtistDetailConcertList
        artistId={route.params.artistId}
        onPressItem={({ concertId }) => {
          navigation.navigate('ConcertStackScreen', {
            screen: 'ConcertDetailScreen',
            params: {
              concertId,
            },
          })
        }}
        onPressArtistProfile={() => setProfileImageViewerVisible(true)}
      />
      <ArtistProfileImageModal
        visible={profileImageViewerVisible}
        artistId={route.params.artistId}
        onClose={() => setProfileImageViewerVisible(false)}
      />
    </CommonScreenLayout>
  )
}
