import React, { createContext, PropsWithChildren, useCallback, useState } from 'react'

export const TabBarVisibleContext = createContext<{
  tabBarVisible: boolean
  show: () => void
  hide: () => void
}>({
  tabBarVisible: true,
  show: () => {},
  hide: () => {},
})

export const TabBarVisibleContextProvider = ({ children }: PropsWithChildren) => {
  const [tabBarVisible, setTabBarVisible] = useState<boolean>(true)
  const show = useCallback(() => {
    setTabBarVisible(true)
  }, [])
  const hide = useCallback(() => {
    setTabBarVisible(false)
  }, [])
  return <TabBarVisibleContext.Provider value={{ tabBarVisible, show, hide }}>{children}</TabBarVisibleContext.Provider>
}
