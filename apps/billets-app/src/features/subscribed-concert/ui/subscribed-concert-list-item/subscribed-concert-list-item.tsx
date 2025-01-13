import { components } from '@/types/api'
import { ConcertListItem } from '../../../concert/ui'

export function SubscribedConcertListItem({
  data,
  onPress,
  size = 'small',
}: {
  data: components['schemas']['ConcertDTOSchema']
  onPress: (concertId: string) => void
  size?: 'small' | 'large'
}) {
  return <ConcertListItem data={data} onPress={onPress} size={size} />
}
