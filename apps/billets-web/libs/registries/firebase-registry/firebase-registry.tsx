'use client'

import { Firebase } from '@/features/firebase'
import { PropsWithChildren, useEffect } from 'react'

export function FirebaseRegistry({ children }: PropsWithChildren) {
  useEffect(() => {
    function initFirebase() {
      Firebase.initializeApp()
    }
    initFirebase()
  }, [])

  return <>{children}</>
}
