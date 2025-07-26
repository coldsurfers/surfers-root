import { type NextRequest, NextResponse } from 'next/server';
import { COOKIE_ACCESS_TOKEN_KEY } from './utils/constants';

export function middleware(req: NextRequest) {
  // /auth 로 시작하지 않는 경로에 대해서 로그인 여부를 확인한다.
  if (!req.nextUrl.pathname.startsWith('/auth')) {
    const isLoggedIn = req.cookies.get(COOKIE_ACCESS_TOKEN_KEY);
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/auth/local-logout', req.url));
    }
  } else {
    // /auth 로 시작하는 경로에 대해서 로그인 여부를 확인한다.
    const isLoggedIn = req.cookies.get(COOKIE_ACCESS_TOKEN_KEY);
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // https://stackoverflow.com/questions/73229148/uncaught-syntaxerror-expected-expression-got-while-using-next-js-middlewar
    // _next도 추가해주어야 하는데, 이유는 위의 stack overflow에 있다.
    // '/((?!_next|auth|api).*)', // `/auth`로 시작하지 않는 모든 경로
    '/((?!_next|api).*)', // client 경로 외의 모든 경로
    // '/:path*', // 모든 경로
  ],
};
