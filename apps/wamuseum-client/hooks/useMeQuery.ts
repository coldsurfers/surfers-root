import { OperationVariables, QueryHookOptions, useQuery } from '@apollo/client'
import { MeData } from '../gql/schema'
import { ME_QUERY } from '../gql/queries'

export default function useMeQuery(
  options?: QueryHookOptions<{ me: MeData }, OperationVariables>
) {
  return useQuery<{
    me: MeData
  }>(ME_QUERY, options)
}
