'use client'

import { Firebase } from '@/app/(lib)'
import { PropsWithChildren, useEffect } from 'react'

export function FirebaseContext({ children }: PropsWithChildren) {
  useEffect(() => {
    function initFirebase() {
      Firebase.initializeApp()
    }
    initFirebase()
  }, [])

  return <>{children}</>
}
