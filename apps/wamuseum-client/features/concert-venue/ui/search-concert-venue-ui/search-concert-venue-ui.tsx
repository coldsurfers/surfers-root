'use client';

import { Spinner, Text, TextInput, colors } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useDebounce } from '@uidotdev/usehooks';
import { useMemo, useState } from 'react';
import {
  ConcertVenuesDocument,
  type ConcertVenuesQuery,
  type ConcertVenuesQueryVariables,
  useCreateConcertVenueMutation,
  useSearchConcertVenueQuery,
} from 'src/__generated__/graphql';

const SearchResultWrapper = styled.div`
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: ${colors.oc.white.value};
  padding: 8px;
  margin: 4px;
`;

export const SearchConcertVenueUI = ({ concertId }: { concertId: string }) => {
  const [searchConcertVenueKeyword, setSearchConcertVenueKeyword] = useState('');
  const debouncedSearchConcertVenueKeyword = useDebounce(searchConcertVenueKeyword, 350);
  const { data: searchedConcertVenues, loading: loadingSearchConcertVenue } =
    useSearchConcertVenueQuery({
      variables: {
        keyword: debouncedSearchConcertVenueKeyword,
      },
      skip: debouncedSearchConcertVenueKeyword === '',
    });

  const [mutateCreateConcertVenue] = useCreateConcertVenueMutation({});

  const concertVenuesSearchResult = useMemo(() => {
    if (searchedConcertVenues?.searchConcertVenue?.__typename === 'SearchedConcertVenueList') {
      return searchedConcertVenues.searchConcertVenue.list ?? [];
    }
    return [];
  }, [searchedConcertVenues]);

  return (
    <>
      <TextInput
        value={searchConcertVenueKeyword}
        onChange={(event) => setSearchConcertVenueKeyword(event.target.value)}
        placeholder="아티스트 검색"
        style={{
          marginTop: 12,
        }}
      />
      {concertVenuesSearchResult.length > 0 ? (
        <SearchResultWrapper>
          {concertVenuesSearchResult.map((result) => (
            <div
              key={result?.id}
              onKeyUp={() => {}}
              onClick={() => {
                if (!result || !result.id) {
                  return;
                }
                mutateCreateConcertVenue({
                  variables: {
                    input: {
                      venueId: result.id,
                      concertId,
                    },
                  },
                  update: (cache, { data }) => {
                    if (data?.createConcertVenue?.__typename !== 'Venue') {
                      return;
                    }
                    const concertVenuesCache = cache.readQuery<
                      ConcertVenuesQuery,
                      ConcertVenuesQueryVariables
                    >({
                      query: ConcertVenuesDocument,
                      variables: {
                        concertId,
                      },
                    });
                    if (!concertVenuesCache) {
                      return;
                    }
                    if (concertVenuesCache.concertVenues?.__typename === 'ConcertVenueList') {
                      cache.writeQuery({
                        query: ConcertVenuesDocument,
                        data: {
                          concertVenues: {
                            ...concertVenuesCache.concertVenues,
                            list: concertVenuesCache.concertVenues.list?.concat({
                              ...data.createConcertVenue,
                            }),
                          },
                        },
                        variables: {
                          concertId,
                        },
                      });
                    }
                  },
                });
              }}
              style={{
                background: colors.oc.white.value,
                cursor: 'pointer',
              }}
            >
              <Text>{result?.name}</Text>
            </div>
          ))}
        </SearchResultWrapper>
      ) : null}
      {loadingSearchConcertVenue ? <Spinner variant="page-overlay" /> : null}
    </>
  );
};
