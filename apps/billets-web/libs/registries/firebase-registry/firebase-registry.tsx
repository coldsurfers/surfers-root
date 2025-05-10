'use client'

import { initializeFirebase } from '@/features/firebase/firebase'
import { PropsWithChildren, useLayoutEffect } from 'react'

export function FirebaseRegistry({ children }: PropsWithChildren) {
  useLayoutEffect(() => {
    initializeFirebase()
  }, [])
  return <>{children}</>
}
