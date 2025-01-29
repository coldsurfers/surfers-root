import { ArtistDetailConcertList, ArtistProfileImageModal, CommonScreenLayout } from '@/ui'
import { useState } from 'react'
import { useArtistDetailScreenNavigation, useArtistDetailScreenRoute } from './artist-detail-screen.hooks'

export const ArtistDetailScreen = () => {
  const route = useArtistDetailScreenRoute()
  const navigation = useArtistDetailScreenNavigation()
  const [profileImageViewerVisible, setProfileImageViewerVisible] = useState(false)

  return (
    <CommonScreenLayout>
      <ArtistDetailConcertList
        artistId={route.params.artistId}
        onPressItem={({ eventId }) => {
          navigation.navigate('EventStackNavigation', {
            screen: 'EventDetailScreen',
            params: {
              eventId,
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
