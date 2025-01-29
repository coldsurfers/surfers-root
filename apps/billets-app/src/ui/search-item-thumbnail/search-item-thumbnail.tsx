import { colors } from '@coldsurfers/ocean-road'
import { ProfileThumbnail, useColorScheme } from '@coldsurfers/ocean-road/native'

export const SearchItemThumbnail = ({
  uri,
  type,
  emptyBgText = '',
}: {
  uri: string
  type: 'square' | 'circle'
  emptyBgText?: string
}) => {
  const { semantics } = useColorScheme()
  return (
    <ProfileThumbnail
      type={type}
      emptyBgText={emptyBgText}
      imageUrl={uri}
      size="md"
      style={{
        backgroundColor: semantics.background[4],
      }}
    />
  )
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
