// Since we have a root `not-found.tsx` page, a layout file

import { PropsWithChildren } from 'react'

// is required, even if it's just passing children through.
export default function RootLayout({ children }: PropsWithChildren) {
  return children
}
