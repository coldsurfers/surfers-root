import { type NextRequest, NextResponse } from 'next/server';
import { COOKIE_ACCESS_TOKEN_KEY } from './libs/constants';

export function middleware(request: NextRequest) {
  // billets.coldsurf.io로 올 시, coldsurf.io로 리다이렉트
  if (request.headers.get('host') === 'billets.coldsurf.io') {
    const url = request.nextUrl.clone();
    url.hostname = 'coldsurf.io';
    return NextResponse.redirect(url);
  }

  const { pathname } = request.nextUrl;
  // /browse 로 올 시 자동으로 /browse/seoul로 리다이렉트
  if (pathname === '/browse') {
    return NextResponse.redirect(new URL('/browse/seoul', request.url));
  }

  // 레거시: /event/[event-id] 패턴으로 올 경우 대비
  // UUID 패턴만 매칭 (대소문자 허용)
  const legacyEventPagePathMatch = pathname.match(
    /^\/event\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/
  );

  if (legacyEventPagePathMatch) {
    const eventId = legacyEventPagePathMatch[1];
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const idToSlugJson = require('./id-to-slug.json');
    const slug = idToSlugJson[eventId];

    if (slug) {
      const newUrl = new URL(`/event/${slug}`, request.url);
      return NextResponse.redirect(newUrl, 301); // 301 (영구 리디렉션)
    }
    return NextResponse.redirect(new URL('/404', request.url));
  }

  // 레거시: /venue/[venue-id] 패턴으로 올 경우 대비
  // UUID 패턴만 매칭 (대소문자 허용)
  const legacyVenuePagePathMatch = pathname.match(
    /^\/venue\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/
  );
  if (legacyVenuePagePathMatch) {
    const venueId = legacyVenuePagePathMatch[1];
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const idToSlugJson = require('./venue-id-to-slug.json');
    const slug = idToSlugJson[venueId];

    if (slug) {
      const newUrl = new URL(`/venue/${slug}`, request.url);
      return NextResponse.redirect(newUrl, 301); // 301 (영구 리디렉션)
    }
    return NextResponse.redirect(new URL('/404', request.url));
  }

  // 레거시: /tattoo 패턴으로 올 경우 대비, 추후 타투 구좌가 생기면 풀면 됨
  const legacyTattooPagePathMatch = pathname.startsWith('/tattoo');
  if (legacyTattooPagePathMatch) {
    return NextResponse.redirect(new URL('/partners', request.url));
  }

  // 레거시: /store/registration 패턴으로 올 경우 대비, 추후 입점 페이지가 생기면 풀면 됨
  const legacyStoreRegistrationPagePathMatch = pathname.startsWith('/store/registration');
  if (legacyStoreRegistrationPagePathMatch) {
    return NextResponse.redirect(new URL('/partners', request.url));
  }

  // 로그인 페이지에 접근 했지만, 이미 로그인 된 경우 '/' 로 리다이렉트
  if (request.nextUrl.pathname.startsWith('/login')) {
    const isLoggedIn = !!request.cookies.get(COOKIE_ACCESS_TOKEN_KEY)?.value;
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}

// 특정 경로에만 미들웨어 적용
export const config = {
  // matcher: ['/browse', '/event/:path*'],
  matcher: [
    // https://stackoverflow.com/questions/73229148/uncaught-syntaxerror-expected-expression-got-while-using-next-js-middlewar
    // _next도 추가해주어야 하는데, 이유는 위의 stack overflow에 있다.
    // '/((?!_next|auth|api).*)', // `/auth`로 시작하지 않는 모든 경로
    '/((?!_next|api).*)', // client 경로 외의 모든 경로
  ],
  // billets.coldsurf.io 레거시 처리용
  // matcher: ['/:path*'],
};
