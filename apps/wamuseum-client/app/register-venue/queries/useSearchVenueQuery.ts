import { gql, useQuery } from '@apollo/client';
import type { CommonQueryHookOptions } from '../../../libs/types';
import type { SearchVenueData } from '../../../src/__generated__/graphql';

export const searchVenueQuery = gql`
  query SearchVenue($keyword: String!) {
    searchVenue(keyword: $keyword) {
      ... on SearchedVenueList {
        list {
          id
          phone
          category_group_name
          category_name
          distance
          category_group_code
          address_name
          place_name
          place_url
          road_address_name
          x
          y
        }
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`;

export type UseSearchVenueQueryDataT = {
  searchVenue: SearchVenueData;
};

export type UseSearchVenueQueryInputT = {
  keyword: string;
};

const useSearchVenueQuery = (
  options: CommonQueryHookOptions<UseSearchVenueQueryDataT, UseSearchVenueQueryInputT>
) => useQuery<UseSearchVenueQueryDataT, UseSearchVenueQueryInputT>(searchVenueQuery, options);

export default useSearchVenueQuery;
