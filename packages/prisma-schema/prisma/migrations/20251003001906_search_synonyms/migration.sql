-- 동의어 테이블
create table if not exists public.search_synonyms (
  term text primary key,
  synonyms text[] not null
);

-- 예시 데이터
insert into public.search_synonyms (term, synonyms) values
('재즈', array['jazz', 'ジャズ']),
('힙합', array['랩', 'hiphop', 'hip-hop']),
('인디', array['indie']);
