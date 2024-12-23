import { useUIStore } from '@/lib/stores/ui-store'
import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

export function useShowBottomTabBar() {
  const { showBottomTabBar } = useUIStore(
    useShallow((state) => ({
      showBottomTabBar: state.showBottomTabBar,
    })),
  )

  useEffect(() => {
    showBottomTabBar()
  }, [showBottomTabBar])
}
