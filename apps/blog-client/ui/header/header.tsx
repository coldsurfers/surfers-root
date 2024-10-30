'use client'

import { useUIStore } from '@/stores'
import { useShallow } from 'zustand/shallow'
import { StyledHeaderContainer, StyledHeaderHeading } from './header.styled'

export const Header = () => {
  const { activeTab, setActiveTab } = useUIStore(
    useShallow((state) => ({
      activeTab: state.activeTab,
      setActiveTab: state.setActiveTab,
    })),
  )

  return (
    <StyledHeaderContainer>
      <div onClick={() => setActiveTab('main')} style={{ cursor: 'pointer' }}>
        <StyledHeaderHeading $isActive={activeTab === 'main'}>Main</StyledHeaderHeading>
      </div>
      <div onClick={() => setActiveTab('surflog')} style={{ cursor: 'pointer' }}>
        <StyledHeaderHeading $isActive={activeTab === 'surflog'}>Surflogs</StyledHeaderHeading>
      </div>
      <div onClick={() => setActiveTab('techlog')} style={{ cursor: 'pointer' }}>
        <StyledHeaderHeading $isActive={activeTab === 'techlog'}>Techlogs</StyledHeaderHeading>
      </div>
    </StyledHeaderContainer>
  )
}
