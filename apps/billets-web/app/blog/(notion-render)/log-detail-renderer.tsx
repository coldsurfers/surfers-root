'use client';

import { Spinner, Text, colors, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useCallback, useMemo, useRef, useState } from 'react';
import { PageLayout } from '../(components)/page-layout';
import { TagList } from '../(components)/tag-list/tag-list';
import type { fetchGetSeriesItem } from '../(fetchers)';
import { queryKeyFactory } from '../(react-query)/react-query.key-factory';
import type { AppLocale } from '../(types)/i18n';
import type { SeriesCategory } from '../(types)/series';
import { NotionRenderer } from './notion-renderer';

const APP_LOCALES_TO_DISPLAY_NAMES: Record<AppLocale, string> = {
  ko: 'Korean',
  en: 'English',
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

const AppLocaleText = styled(Text)<{ $isActive: boolean }>`
  font-size: 1.125rem;

  text-align: center;

  margin: unset;

  color: ${colors.oc.blue[8].value};

  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};

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

type CustomMultiSelectProperty = {
  id: string;
  type: 'multi_select';
  multi_select: Array<{
    id: string;
    name: string;
    color: string;
  }>;
};

type CustomTitleProperty = {
  id: 'title';
  type: 'title';
  title: Array<{
    plain_text: string;
  }>;
};

type CustomPeopleProperty = {
  id: string;
  type: 'people';
  people: Array<{
    type: 'person';
    avatar_url: string;
    id: string;
    name: string;
    object: 'user';
  }>;
};

type CustomDateProperty = {
  id: string;
  type: 'date';
  date: {
    end: string | null;
    start: string | null;
    time_zone: string | null;
  };
};

export const LogDetailRenderer = ({
  slug,
  seriesCategory,
  initialData,
}: {
  slug: string;
  seriesCategory: SeriesCategory;
  initialData: Awaited<ReturnType<typeof fetchGetSeriesItem>>;
}) => {
  const [locale, setLocale] = useState<AppLocale>('ko');
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery({
    ...queryKeyFactory.series.item(slug, {
      appLocale: locale,
      seriesCategory,
    }),
    initialData,
    initialDataUpdatedAt: Date.now(), // 중요: 바로 갓 받아온 것으로 표시
    staleTime: Number.POSITIVE_INFINITY, // 신선 → 리마운트시 refetch 안 함
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const [isFetching, setIsFetching] = useState(false);

  const cachedOtherLangs = useRef<AppLocale[]>([]);

  const recordMap = useMemo(() => data.recordMap, [data.recordMap]);

  const page = useMemo(() => data.page, [data]);
  const pageProperties = useMemo(
    () =>
      page?.properties as PageObjectResponse['properties'] & {
        tags: CustomMultiSelectProperty;
        otherLangs: CustomMultiSelectProperty;
        Name: CustomTitleProperty;
        Writer: CustomPeopleProperty;
        'Publish date': CustomDateProperty;
      },
    [page]
  );

  const pageTitle = useMemo(() => pageProperties.Name.title, [pageProperties]);
  const writerName = useMemo(() => {
    return pageProperties.Writer.people.at(0)?.name ?? '';
  }, [pageProperties]);

  const tags = useMemo(
    () =>
      pageProperties.tags.multi_select.map((value) => ({
        id: value.id,
        name: value.name,
        color: value.color,
      })),
    [pageProperties]
  );

  const formattedCreatedAt = useMemo(() => {
    const startDate = pageProperties['Publish date'].date.start;
    if (!startDate) {
      return '';
    }
    return format(new Date(startDate), 'MMMM d, yyyy');
  }, [pageProperties]);

  const otherLangs = useMemo(() => {
    if (cachedOtherLangs.current.length) return cachedOtherLangs.current;
    const otherLangs = pageProperties.otherLangs?.multi_select ?? [];
    const value = [
      {
        name: 'ko',
      },
      ...otherLangs,
    ].map<AppLocale>((value) => value.name as AppLocale);
    cachedOtherLangs.current = value;
    return value;
  }, [pageProperties]);

  const onClickOtherLang = useCallback(
    async (lang: AppLocale) => {
      const { queryKey: nextKey, queryFn } = queryKeyFactory.series.item(slug, {
        appLocale: lang,
        seriesCategory,
      });

      // 1) 캐시에 이미 데이터가 있는지 확인
      const hasCache = queryClient.getQueryData(nextKey) != null;
      const isFetching = queryClient.getQueryState(nextKey)?.fetchStatus === 'fetching';

      // 2) 없거나 아직 받아오는 중이 아니면 prefetch
      if (!hasCache && !isFetching) {
        setIsFetching(true);
        await queryClient.prefetchQuery({
          queryKey: nextKey,
          queryFn,
          staleTime: Number.POSITIVE_INFINITY,
        });
        setIsFetching(false);
      }

      // 3) 언어 상태 변경 → 클라 컴포넌트 내부의 useSuspenseQuery가 nextKey로 읽음
      setLocale(lang);
    },
    [queryClient, slug, seriesCategory]
  );

  return (
    <>
      <PageLayout title={pageTitle?.at(0)?.plain_text}>
        <article style={{ marginTop: '2rem' }}>
          <TagList tags={tags} />
          <AppLocalesWrapper>
            {otherLangs.map((lang, index) => (
              <div
                key={lang}
                onClick={() => onClickOtherLang(lang)}
                onKeyUp={(e) => e.key === 'Enter' && onClickOtherLang(lang)}
                // biome-ignore lint/a11y/useSemanticElements: <explanation>
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              >
                <AppLocaleText as="p" $isActive={locale === lang}>
                  {APP_LOCALES_TO_DISPLAY_NAMES[lang as AppLocale]}
                  {index !== otherLangs.length - 1 && (
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
      </PageLayout>
      {isFetching && <Spinner variant="page-overlay" />}
    </>
  );
};
