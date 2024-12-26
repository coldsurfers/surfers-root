'use client'

import { useCallback, useState } from 'react'

export function useToggle() {
  const [toggle, setToggle] = useState(false)

  const handleToggle = useCallback(() => {
    setToggle((prev) => !prev)
  }, [])

  return [toggle, handleToggle] as const
}
