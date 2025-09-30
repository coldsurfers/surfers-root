drop function if exists public.search_concerts_trgm(text, int, int, text);

create or replace function public.search_concerts_trgm(
  q text,
  limit_input int default 20,
  offset_input int default 0,
  city_id_input text default null
)
returns table (
  id text,
  title text,
  slug text,
  date timestamptz,
  locationCityId text,
  score float,
  matched boolean,
  posters jsonb
)
language sql
stable
as $$
with base as (
  select
    c.id,
    c.title,
    c.slug,
    c.date,
    c."locationCityId",
    greatest(
      similarity(normalize_text(c.title), normalize_text(q)),
      similarity(normalize_text(c.slug), normalize_text(q))
    ) as score,
    (
      normalize_text(c.title) ilike '%' || normalize_text(q) || '%'
      or normalize_text(c.slug) ilike '%' || normalize_text(q) || '%'
    ) as matched
  from "Concert" c
  where c."deletedAt" is null
    and (
      normalize_text(c.title) ilike '%' || normalize_text(q) || '%'
      or normalize_text(c.slug) ilike '%' || normalize_text(q) || '%'
      or normalize_text(c.title) % normalize_text(q)
      or normalize_text(c.slug) % normalize_text(q)
    )
    and (city_id_input is null or c."locationCityId" = city_id_input)
    and c.date >= now()
)
select
  b.id,
  b.title,
  b.slug,
  b.date,
  b."locationCityId",
  b.score,
  b.matched,
  coalesce(
    (
      select jsonb_agg(jsonb_build_object(
        'id', p.id,
        'imageURL', p."imageURL"
      ))
      from "ConcertsOnPosters" cop
      join "Poster" p on p.id = cop."posterId"
      where cop."concertId" = b.id
    ),
    '[]'::jsonb
  ) as posters
from base b
order by b.matched desc, b.score desc nulls last, b.date asc
limit limit_input offset offset_input;
$$;
