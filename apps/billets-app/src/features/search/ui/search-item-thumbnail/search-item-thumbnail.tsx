import { colors } from '@coldsurfers/ocean-road'
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

SearchItemThumbnail.Skeleton = () => {
  return (
    <ProfileThumbnail
      type="square"
      emptyBgText=""
      size="md"
      style={{
        backgroundColor: colors.oc.gray[4].value,
      }}
    />
  )
}
