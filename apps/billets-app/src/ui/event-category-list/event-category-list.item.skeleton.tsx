import { useColorScheme } from '@coldsurfers/ocean-road/native'
import { StyledEventCategoryButton } from './event-category-list.styled'

export const EventCategoryListItemSkeleton = () => {
  const { semantics } = useColorScheme()
  return (
    <StyledEventCategoryButton
      style={{
        backgroundColor: semantics.background[4],
        width: 92,
        height: 34,
      }}
    />
  )
}
