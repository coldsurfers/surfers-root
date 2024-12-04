import { ArtistDetailConcertList } from '@/features'
import { CommonBackIconButton, CommonScreenLayout } from '@/ui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useArtistDetailScreenNavigation, useArtistDetailScreenRoute } from './artist-detail-screen.hooks'

export const ArtistDetailScreen = () => {
  const route = useArtistDetailScreenRoute()
  const navigation = useArtistDetailScreenNavigation()
  const { top: topInset } = useSafeAreaInsets()

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
      />
    </CommonScreenLayout>
  )
}
