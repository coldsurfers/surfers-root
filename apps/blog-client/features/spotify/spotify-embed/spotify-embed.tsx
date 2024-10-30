'use client'

import { useEffect, useState } from 'react'

export function SpotifyEmbed({ spotifyURL }: { spotifyURL: string }) {
  const [html, setHtml] = useState('')
  useEffect(() => {
    const fetchSpotifyOEmbed = async () => {
      const res = await fetch(`https://open.spotify.com/oembed?url=${spotifyURL}`)
      const data = await res.json()
      setHtml(data.html)
    }
    fetchSpotifyOEmbed()
  }, [spotifyURL])

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}
