import { OperationVariables, QueryHookOptions, useQuery } from '@apollo/client'
import { ConcertCategoryListData } from '../gql/schema'
import { CONCERT_CATEGORY_LIST_QUERY } from '../gql/queries'

export default function useConcertCategoryListQuery(
  options?: QueryHookOptions<
    { concertCategoryList: ConcertCategoryListData },
    OperationVariables
  >
) {
  return useQuery<{
    concertCategoryList: ConcertCategoryListData
  }>(CONCERT_CATEGORY_LIST_QUERY, options)
}
