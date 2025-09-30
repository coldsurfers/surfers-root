-- title 검색 성능을 위한 인덱스
create index if not exists idx_concert_title_trgm
  on "Concert" using gin ("title" gin_trgm_ops);

-- slug 검색 성능을 위한 인덱스
create index if not exists idx_concert_slug_trgm
  on "Concert" using gin ("slug" gin_trgm_ops);
