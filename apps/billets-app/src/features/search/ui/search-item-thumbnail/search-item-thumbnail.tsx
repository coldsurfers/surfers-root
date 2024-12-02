import { ProfileThumbnail } from '@coldsurfers/ocean-road/native'

export const SearchItemThumbnail = ({
  uri,
  type,
  emptyBgText = '',
}: {
  uri: string
  type: 'square' | 'circle'
  emptyBgText?: string
}) => {
  return <ProfileThumbnail type={type} emptyBgText={emptyBgText} imageUrl={uri} size="md" />
}
