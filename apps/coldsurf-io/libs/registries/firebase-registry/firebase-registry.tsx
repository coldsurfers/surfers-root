'use client';

import { initializeFirebase } from '@/features/firebase/firebase';
import { type PropsWithChildren, useLayoutEffect } from 'react';

export function FirebaseRegistry({ children }: PropsWithChildren) {
  useLayoutEffect(() => {
    initializeFirebase();
  }, []);
  return <>{children}</>;
}
