import { useContext } from 'react'
import { useStore } from 'zustand'
import { AuthStore } from '../../stores/authStore'
import { AuthStoreContext } from './AuthStoreRegistry'

// eslint-disable-next-line no-unused-vars
export const useAuthStore = <T>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext)

  if (authStoreContext === undefined) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`)
  }

  return useStore(authStoreContext, selector)
}
