import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import idToSlugMapJson from './id-to-slug-map'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // /browse 로 올 시 자동으로 /browse/seoul로 리다이렉트
  if (pathname === '/browse') {
    return NextResponse.redirect(new URL('/browse/seoul', request.url))
  }

  // /event/[event-id] 패턴으로 올 경우 대비
  const match = pathname.match(/^\/event\/(\d+)$/)

  if (match) {
    const eventId = match[1]
    const slug = idToSlugMapJson[eventId]

    if (slug) {
      const newUrl = new URL(`/event/${slug}`, request.url)
      return NextResponse.redirect(newUrl, 301) // 301 (영구 리디렉션)
    }
  }
}
