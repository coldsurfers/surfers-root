'use client'

import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'
import useMeQuery from '../../hooks/useMeQuery'
import Loader from '../../ui/Loader'

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
    return <Loader />
  }
  return children
}
