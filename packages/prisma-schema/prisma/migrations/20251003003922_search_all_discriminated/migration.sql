drop function if exists public.search_all_discriminated(text, int);

create or replace function public.search_all_discriminated(
  q text,
  limit_input int default 10
)
returns setof jsonb
language sql
stable
as $$
(
  -- 🎵 Concerts
  select jsonb_build_object(
    'type', 'concert',
    'id', c.id,
    'title', c.title,
    'slug', c.slug,
    'date', c.date,
    'locationCityId', c."locationCityId",
    'thumbnailImgUrl',
      (
        select p."imageURL"
        from "ConcertsOnPosters" cop
        join "Poster" p on p.id = cop."posterId"
        where cop."concertId" = c.id
        order by p."createdAt" asc nulls last
        limit 1
      ),
    'venueTitle',
      (
        select v."name"
        from "ConcertsOnVenues" cov
        join "Venue" v on v.id = cov."venueId"
        where cov."concertId" = c.id
        order by v."name" asc
        limit 1
      )
  )
  from "Concert" c
  where c."deletedAt" is null
    and (
      normalize_text(c.title) ilike '%'||normalize_text(q)||'%'
      or normalize_text(c.slug)  ilike '%'||normalize_text(q)||'%'
      or normalize_text(c.title) % normalize_text(q)
      or normalize_text(c.slug)  % normalize_text(q)
    )
  order by similarity(normalize_text(c.title), normalize_text(q)) desc
  limit limit_input
)
union all
(
  -- 🏛 Venues
  select jsonb_build_object(
    'type', 'venue',
    'id', v.id,
    'name', v."name"
  )
  from "Venue" v
  where normalize_text(v."name") ilike '%'||normalize_text(q)||'%'
     or normalize_text(v."name") % normalize_text(q)
  order by similarity(normalize_text(v."name"), normalize_text(q)) desc
  limit limit_input
)
union all
(
  -- 🎤 Artists
  select jsonb_build_object(
    'type', 'artist',
    'id', a.id,
    'name', a."name"
  )
  from "Artist" a
  where normalize_text(a."name") ilike '%'||normalize_text(q)||'%'
     or normalize_text(a."name") % normalize_text(q)
  order by similarity(normalize_text(a."name"), normalize_text(q)) desc
  limit limit_input
);
$$;

grant execute on function public.search_all_discriminated(text,int) to anon, authenticated;
