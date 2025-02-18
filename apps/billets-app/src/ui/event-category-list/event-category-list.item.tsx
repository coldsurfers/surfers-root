import { getEventCategoryUIName } from '@/lib/utils.event-category'
import { useHomeScreenNavigation } from '@/screens'
import { components } from '@/types/api'
import { useColorScheme } from '@coldsurfers/ocean-road/native'
import { memo, useCallback } from 'react'
import {
  DanceIcon,
  MicVocalIcon,
  StyledEventCategoryButton,
  StyledEventCategoryButtonText,
  TheatreIcon,
} from './event-category-list.styled'

// @TODO: same name with billets-web
const getUiIcon = (name: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { semantics } = useColorScheme()
  switch (name) {
    case 'Gigs':
      return <MicVocalIcon size={14} color={semantics.foreground[1]} />
    case 'Theatre':
      return <TheatreIcon size={14} color={semantics.foreground[1]} />
    case 'Dance':
      return <DanceIcon size={14} color={semantics.foreground[1]} />
    default:
      return ''
  }
}

export const EventCategoryListItem = memo((props: components['schemas']['EventCategoryDTOSchema']) => {
  const { semantics } = useColorScheme()
  const navigation = useHomeScreenNavigation()
  const onPress = useCallback(() => {
    navigation.navigate('EventStackNavigation', {
      params: {
        eventCategory: props.name,
      },
      screen: 'EventCategoryScreen',
    })
  }, [navigation, props.name])
  return (
    <StyledEventCategoryButton
      onPress={onPress}
      style={{
        backgroundColor: semantics.background[4],
      }}
    >
      {getUiIcon(props.name)}
      <StyledEventCategoryButtonText weight="medium" style={{ color: semantics.foreground[1] }}>
        {getEventCategoryUIName(props.name)}
      </StyledEventCategoryButtonText>
    </StyledEventCategoryButton>
  )
})
