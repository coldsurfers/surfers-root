import { CommonBackIconButton, CommonScreenLayout } from '@/ui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useConcertTicketListScreenNavigation } from './concert-ticket-list-screen.hooks'

export const ConcertTicketListScreen = () => {
  const { top: topInset } = useSafeAreaInsets()
  const navigation = useConcertTicketListScreenNavigation()
  return (
    <CommonScreenLayout>
      <CommonBackIconButton top={topInset} onPress={() => navigation.goBack()} />
    </CommonScreenLayout>
  )
}
