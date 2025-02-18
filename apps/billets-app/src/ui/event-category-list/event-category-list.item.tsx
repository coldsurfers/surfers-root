import { components } from '@/types/api'
import { useColorScheme } from '@coldsurfers/ocean-road/native'
import { memo } from 'react'
import {
  DanceIcon,
  MicVocalIcon,
  StyledEventCategoryButton,
  StyledEventCategoryButtonText,
  TheatreIcon,
} from './event-category-list.styled'

// @TODO: same name with billets-web
const getEventCategoryUIName = (originalName: string) => {
  switch (originalName) {
    case 'Gigs':
      return '콘서트'
    case 'Theatre':
      return '연극 / 뮤지컬'
    case 'Dance':
      return '무용'
    default:
      return originalName
  }
}

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
  return (
    <StyledEventCategoryButton
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
