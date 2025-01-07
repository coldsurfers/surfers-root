import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/browse') {
    return NextResponse.redirect(new URL('/browse/seoul', request.url))
  }
}
