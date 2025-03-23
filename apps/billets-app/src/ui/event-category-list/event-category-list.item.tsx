import { zodScreen } from '@/lib/navigations'
import { getEventCategoryUIName } from '@/lib/utils.event-category'
import { useHomeScreenNavigation } from '@/screens'
import { components } from '@/types/api'
import { useColorScheme } from '@coldsurfers/ocean-road/native'
import { useStartProfiler } from '@shopify/react-native-performance'
import { memo, useCallback } from 'react'
import { StyledEventCategoryButton, StyledEventCategoryButtonText } from './event-category-list.styled'
import { getUiIcon } from './event-category-list.utils'

export const EventCategoryListItem = memo((props: components['schemas']['EventCategoryDTOSchema']) => {
  const startNavigationTTITimer = useStartProfiler()
  const { semantics } = useColorScheme()
  const navigation = useHomeScreenNavigation()
  const onPress = useCallback(() => {
    startNavigationTTITimer({
      source: zodScreen.HomeScreen.name,
      uiEvent: undefined,
    })
    navigation.navigate('EventStackNavigation', {
      params: {
        eventCategory: props.name,
      },
      screen: 'EventCategoryScreen',
    })
  }, [navigation, props.name, startNavigationTTITimer])
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
