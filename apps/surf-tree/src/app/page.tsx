'use client'

import { useLayoutEffect } from 'react'

const TIME_DURATION = 5000

const TITLE = 'Welcome to SurfTree'
const SUBTITLE = 'Moving to COLDSURF main page in 5 seconds'

export default function Home() {
  useLayoutEffect(() => {
    setTimeout(() => {
      window.location.href = 'https://coldsurf.io'
    }, TIME_DURATION)
  }, [])

  return (
    <>
      <h1>{TITLE}</h1>
      <h2>{SUBTITLE}</h2>
    </>
  )
}
