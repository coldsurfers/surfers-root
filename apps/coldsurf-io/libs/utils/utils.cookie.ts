export const createCommonCookieOptions = ({
  maxAge,
}: {
  maxAge: number;
}) => {
  return {
    // javascript에서 접근 불가능하도록 설정 (document.cookie 접근 불가능)
    httpOnly: true,
    // 응답을 받은 브라우저에서 응답을 보내준 프로토콜이 https만 허용할지 결정, 개발환경에서는 http도 허용하도록
    secure: process.env.NODE_ENV === 'production',
    // 최대 유지 시간 설정
    maxAge,
    // 쿠키값 공유 strict 설정
    sameSite: 'strict',
    path: '/',
    // 오직 정확히 같은 도메인에서만 set-cookie 허용
    domain: undefined,
  } as const;
};
