-- 확장 먼저 (이미 있으면 skip됨)
create extension if not exists unaccent;

-- normalize_text 함수 정의
create or replace function public.normalize_text(input text)
returns text
language sql
immutable
as $$
  select regexp_replace(unaccent(input), '\s+', '', 'g')
$$;

-- 권한 부여 (익명/인증 사용자 모두 사용 가능하게)
grant execute on function public.normalize_text(text) to anon, authenticated;
