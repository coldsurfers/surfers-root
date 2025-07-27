import { SITE_URL } from '@/libs/constants';
import { connectDbClient, dbClient, disconnectDbClient } from '@/libs/db/db.client';
import { cache } from 'react';
import { ALL_SERIES_CATEGORIES } from './blog/(constants)';
import { queryAllSeries, queryTags } from './blog/(notion)/query';

const generateUrl = (subPath: string) => {
  return `${SITE_URL}${subPath}`;
};
const findAllVenues = cache(async () => {
  const venues = await dbClient.venue.findMany();
  return venues;
});
const findAllArtists = cache(async () => {
  const artists = await dbClient.artist.findMany();
  return artists;
});
const findAllCities = cache(async () => {
  const cities = await dbClient.locationCity.findMany();
  return cities;
});
const findFutureEvents = cache(async () => {
  const events = await dbClient.concert.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
  });
  return events;
});
const findAllEventCategories = cache(async () => {
  const eventCategories = await dbClient.eventCategory.findMany();
  return eventCategories;
});

const generateBlogSitemaps = cache(async () => {
  const allSeries = await queryAllSeries({
    lang: 'ko',
  });
  const allSeriesItemsValues = allSeries.map((value) => ({
    slug: value.slug,
    seriesCategory: value.seriesCategory,
    lastModified: value.lastEditedTime,
  }));
  const allTags = await queryTags();
  const allTagsByLocales = allTags.flatMap((tag) => {
    return {
      tag: tag.name,
      locale: 'ko',
    };
  });

  const allSeriesEntry = ALL_SERIES_CATEGORIES.map((series) => {
    return {
      url: generateUrl(`/blog/${series}`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  const allSeriesItemsEntry = allSeriesItemsValues.map(({ slug, seriesCategory, lastModified }) => {
    return {
      url: generateUrl(`/blog/${seriesCategory ?? ''}/${slug}`),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  const allTagsEntry = allTagsByLocales.map(({ tag }) => {
    return {
      url: generateUrl(`/blog/tags/${tag}`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  return [
    {
      url: generateUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...allSeriesEntry,
    ...allSeriesItemsEntry,
    {
      url: generateUrl('/blog/tags'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...allTagsEntry,
  ];
});

export default async function sitemap() {
  await connectDbClient();
  const staticSitemaps = [
    {
      url: generateUrl(''),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: generateUrl('/about'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: generateUrl('/privacy-policy'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: generateUrl('/terms-of-service'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: generateUrl('/browse'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const allCities = await findAllCities();

  // "/browse/[city]"
  const browseByCitySitemaps = allCities.map((city) => {
    const url = generateUrl(`/browse/${city.name}`);
    const lastModified = new Date();
    const changeFrequency = 'weekly';
    const priority = 0.8;
    return {
      url,
      lastModified,
      changeFrequency,
      priority,
    };
  });

  // "/browse/[city]/[event-category]"
  const allEventCategories = await findAllEventCategories();
  const browseByCityEventCategorySitemaps = allCities.flatMap((city) => {
    return allEventCategories.map((eventCategory) => {
      const url = generateUrl(`/browse/${city.name}/${eventCategory.name.toLowerCase()}`);
      const lastModified = new Date();
      const changeFrequency = 'weekly';
      const priority = 0.8;
      return {
        url,
        lastModified,
        changeFrequency,
        priority,
      };
    });
  });

  /**
   * 이미 날짜가 지나간 이벤트들은 sitemap을 만들 필요 없음
   */
  const futureEvents = await findFutureEvents();

  // "/event/[slug]"
  const eventSitemaps = futureEvents
    .map((event) => {
      if (!event.slug) {
        return null;
      }
      const url = generateUrl(`/event/${encodeURIComponent(event.slug)}`);
      const lastModified = new Date();
      const changeFrequency = 'weekly';
      const priority = 0.8;
      return {
        url,
        lastModified,
        changeFrequency,
        priority,
      };
    })
    .filter((value) => value !== null);

  // "/venue/[venue-id]"
  const allVenues = await findAllVenues();
  const venueSitemaps = allVenues.map((venue) => {
    const lastModified = new Date();
    const changeFrequency = 'weekly';
    const priority = 0.8;
    return {
      url: generateUrl(`/venue/${venue.id}`),
      lastModified,
      changeFrequency,
      priority,
    };
  });

  // "/artist/[artist-id]"
  const allArtists = await findAllArtists();
  const artistSitemaps = allArtists.map((artist) => {
    const lastModified = new Date();
    const changeFrequency = 'weekly';
    const priority = 0.8;
    return {
      url: generateUrl(`/artist/${artist.id}`),
      lastModified,
      changeFrequency,
      priority,
    };
  });

  const blogSitemaps = await generateBlogSitemaps();

  await disconnectDbClient();

  return [
    ...staticSitemaps,
    ...browseByCitySitemaps,
    ...browseByCityEventCategorySitemaps,
    ...eventSitemaps,
    ...venueSitemaps,
    ...artistSitemaps,
    ...blogSitemaps,
  ];
}
