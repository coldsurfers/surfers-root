import { NextRequest, NextResponse } from 'next/server'
import idToSlugMapJson from './id-to-slug-map'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // /browse 로 올 시 자동으로 /browse/seoul로 리다이렉트
  if (pathname === '/browse') {
    return NextResponse.redirect(new URL('/browse/seoul', request.url))
  }

  // /event/[event-id] 패턴으로 올 경우 대비
  // UUID 패턴만 매칭 (대소문자 허용)
  const match = pathname.match(
    /^\/event\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  )

  if (match) {
    const eventId = match[1]
    const slug = idToSlugMapJson[eventId]
    console.log('slug', slug)

    if (slug) {
      const newUrl = new URL(`/event/${slug}`, request.url)
      return NextResponse.redirect(newUrl, 301) // 301 (영구 리디렉션)
    }
    return NextResponse.redirect(new URL('/404', request.url))
  }
}

// 특정 경로에만 미들웨어 적용
export const config = {
  matcher: ['/browse', '/event/:path*'],
}
