'use client'

import { Spinner } from '@coldsurfers/ocean-road'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'
import useMeQuery from '../../hooks/useMeQuery'

export default function AuthLayout({ children }: PropsWithChildren) {
  const { data, loading } = useMeQuery()
  const router = useRouter()

  useEffect(() => {
    if (!data || !data.me) return
    switch (data.me.__typename) {
      case 'User':
        router.push('/')
        break
      default:
        break
    }
  }, [data, router])

  if (loading) {
    return <Spinner variant="page-overlay" />
  }
  return children
}
