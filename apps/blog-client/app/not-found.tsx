'use client'

import { permanentRedirect, usePathname } from 'next/navigation'

export default function NotFound() {
  const pathname = usePathname()

  permanentRedirect(`/en/${pathname}`)
}
