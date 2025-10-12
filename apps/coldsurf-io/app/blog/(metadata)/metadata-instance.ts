import { SITE_URL } from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import type {
  PageObjectResponse,
  UserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { Metadata } from 'next/types';
import type { OfficialBlogSeriesCategory, SeriesCategory } from '../(types)/series';

export const generateLogDetailMetadata = (
  page: PageObjectResponse | null,
  options: {
    // locale: (typeof routing.locales)[number]
    slug: string;
    seriesCategory: SeriesCategory | OfficialBlogSeriesCategory;
  }
) => {
  if (!page) {
    return {
      title: `BLOG, ${SERVICE_NAME}`,
    };
  }

  const pageTitle = (() => {
    if (page?.properties.Name.type !== 'title') {
      return '';
    }
    return page.properties.Name.title.at(0)?.plain_text ?? '';
  })();

  if (!pageTitle) {
    return {
      title: `BLOG, ${SERVICE_NAME}`,
    };
  }

  const writers = (() => {
    if (page.properties?.Writer.type !== 'people') {
      return [];
    }
    return page?.properties?.Writer.people
      .map((value) => {
        const _value = value as UserObjectResponse;
        return _value.name;
      })
      .filter((value) => value !== null);
  })();

  const publishDate = (() => {
    if (page.properties?.['Publish date']?.type !== 'date') {
      return null;
    }
    return page.properties?.['Publish date'].date?.start
      ? new Date(page.properties?.['Publish date'].date.start)
      : null;
  })();

  const tags = (() => {
    if (page.properties.tags.type !== 'multi_select') {
      return [];
    }
    return page.properties.tags.multi_select.map((value) => ({
      id: value.id,
      name: value.name,
      color: value.color,
    }));
  })();

  const authors: Metadata['authors'] = writers.map((name: string) => {
    return {
      name,
    };
  });

  const thumbnailUrl = (() => {
    if (page.properties?.thumb.type !== 'url') {
      return '';
    }
    return page.properties?.thumb.url ?? '';
  })();

  const metadata: Metadata = metadataInstance.generateMetadata<Metadata>({
    title: `${pageTitle} | BLOG, ${SERVICE_NAME}`,
    description: `${pageTitle}`,
    authors,
    openGraph: {
      type: 'article',
      publishedTime: publishDate?.toISOString(),
      authors: writers,
      url: `${SITE_URL}/official-blog/${options.seriesCategory}/${options.slug}`,
      title: pageTitle,
      description: `${pageTitle}`,
      images: [
        {
          url: thumbnailUrl ?? '',
        },
      ],
    },
    keywords: tags.map((tag) => tag.name),
    alternates: {
      canonical: `${SITE_URL}/official-blog/${options.seriesCategory}/${options.slug}`,
      languages: {
        ko: `${SITE_URL}/official-blog/${options.seriesCategory}/${options.slug}`,
      },
    },
  });

  return metadata;
};

export const generateLogListMetadata = ({
  title,
  description,
  // locale,
  seriesCategory,
}: {
  title: string;
  description: string;
  seriesCategory?: SeriesCategory | OfficialBlogSeriesCategory;
}) => {
  const metaTitle = title;
  const metaDescription = description;

  const meta = metadataInstance.generateMetadata<Metadata>({
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      url: seriesCategory ? `${SITE_URL}/official-blog/${seriesCategory}` : undefined,
    },
    alternates: {
      canonical: seriesCategory ? `${SITE_URL}/official-blog/${seriesCategory}` : undefined,
      languages: seriesCategory
        ? {
            ko: `${SITE_URL}/official-blog/${seriesCategory}`,
          }
        : undefined,
    },
  });

  return meta;
};
