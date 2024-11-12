import { OperationVariables, QueryHookOptions, useQuery } from '@apollo/client'
import { ME_QUERY } from '../gql/queries'
import { MeData } from '../gql/schema'

export default function useMeQuery(options?: QueryHookOptions<{ me: MeData }, OperationVariables>) {
  return useQuery<{
    me: MeData
  }>(ME_QUERY, options)
}
