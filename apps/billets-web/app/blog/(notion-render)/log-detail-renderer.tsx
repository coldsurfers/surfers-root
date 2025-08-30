'use client';

import { Button, Text, colors, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { PersonUserObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { PageLayout } from '../(components)/page-layout';
import { TagList } from '../(components)/tag-list/tag-list';
import { queryKeyFactory } from '../(react-query)/react-query.key-factory';
import type { AppLocale } from '../(types)/i18n';
import type { SeriesCategory } from '../(types)/series';
import { NotionRenderer } from './notion-renderer';

const AVAILABLE_APP_LOCALES: AppLocale[] = ['ko', 'en'];
const APP_LOCALES_TO_DISPLAY_NAMES: Record<AppLocale, string> = {
  ko: '한국어',
  en: 'English',
};
const NOT_TRANSLATED_ARTICLE_MESSAGE = {
  ko: '아직 번역되지 않은 글이에요.',
  en: 'This article has not been translated yet.',
};
const GO_BACK_BUTTON_TEXT = {
  ko: '돌아가기',
  en: 'Go back',
};

const WriterText = styled(Text)`
  font-size: 20px;

  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.25rem;

  ${media.small(css`
    font-size: 16px;
  `)}
`;

const CreatedAtText = styled(Text)`
  font-size: 16px;

  text-align: center;

  color: ${semantics.color.foreground[4]};

  margin: unset;

  ${media.small(css`
    font-size: 14px;
  `)}
`;

const AppLocaleText = styled(Text)`
  font-size: 1.125rem;

  text-align: center;

  margin: unset;

  color: ${colors.oc.blue[8].value};

  ${media.small(css`
    font-size: 1rem;
  `)}
`;

const AppLocaleTextSeparator = styled.span`
  color: ${semantics.color.foreground[4]};

  ${media.small(css`
    font-size: 1rem;
  `)}
`;

const RendererSection = styled.section`
  margin-top: 2rem;

  ${media.small(css`
    margin-top: 1rem;
  `)}
`;

const AppLocalesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 1rem;
`;

export const LogDetailRenderer = ({
  slug,
  locale,
  seriesCategory,
  onClickAppLocale,
  onClickBack,
}: {
  slug: string;
  locale: AppLocale;
  seriesCategory: SeriesCategory;
  onClickAppLocale: (appLocale: AppLocale) => void;
  onClickBack: () => void;
}) => {
  const { data } = useSuspenseQuery(
    queryKeyFactory.series.item(slug, {
      appLocale: locale,
      seriesCategory,
    })
  );

  const page = useMemo(() => data?.page, [data]);
  const recordMap = useMemo(() => data?.recordMap, [data?.recordMap]);

  const pageTitle = useMemo(
    () => (page?.properties.Name.type === 'title' ? page.properties.Name.title : null),
    [page]
  );
  const writerName = useMemo(() => {
    if (page?.properties.Writer?.type === 'people') {
      const writer = page.properties.Writer.people.at(0) as PersonUserObjectResponse;
      return writer.name;
    }
    return '';
  }, [page]);

  const tags = useMemo(
    () =>
      page?.properties.tags.type === 'multi_select'
        ? page?.properties.tags.multi_select.map((value) => ({
            id: value.id,
            name: value.name,
            color: value.color,
          }))
        : [],
    [page]
  );

  const formattedCreatedAt = useMemo(
    () =>
      data
        ? format(
            new Date(
              (data.page.properties['Publish date'] as { date: { start: string } }).date.start
            ),
            'MMMM d, yyyy'
          )
        : '',
    [data]
  );

  return (
    <PageLayout title={pageTitle?.at(0)?.plain_text}>
      {data === null ? (
        <div
          style={{
            marginTop: '5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text as="h2" style={{ textAlign: 'center' }}>
            {NOT_TRANSLATED_ARTICLE_MESSAGE[locale]}
          </Text>
          <Button onClick={onClickBack}>{GO_BACK_BUTTON_TEXT[locale]}</Button>
        </div>
      ) : (
        <article style={{ marginTop: '2rem' }}>
          <TagList tags={tags} />
          <AppLocalesWrapper>
            {AVAILABLE_APP_LOCALES.map((appLocale, index) => (
              <div
                key={appLocale}
                onClick={() => onClickAppLocale(appLocale)}
                onKeyUp={(e) => e.key === 'Enter' && onClickAppLocale(appLocale)}
                // biome-ignore lint/a11y/useSemanticElements: <explanation>
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              >
                <AppLocaleText as="p">
                  {APP_LOCALES_TO_DISPLAY_NAMES[appLocale]}
                  {index !== AVAILABLE_APP_LOCALES.length - 1 && (
                    <AppLocaleTextSeparator> | </AppLocaleTextSeparator>
                  )}
                </AppLocaleText>
              </div>
            ))}
          </AppLocalesWrapper>
          <WriterText as="p">
            Written by <span style={{ fontWeight: 'bold' }}>{writerName}</span>
          </WriterText>
          <CreatedAtText as="p">{formattedCreatedAt}</CreatedAtText>
          <RendererSection>{recordMap && <NotionRenderer recordMap={recordMap} />}</RendererSection>
        </article>
      )}
    </PageLayout>
  );
};
