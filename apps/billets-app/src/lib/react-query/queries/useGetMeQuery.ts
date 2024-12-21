import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchClient } from '../../api/openapi-client'
import { v1QueryKeyFactory } from '../../query-key-factory'

const queryFn = async () => {
  const data = await fetchClient.GET('/v1/user/me')
  return data.data ?? null
}

function useGetMeQuery() {
  return useSuspenseQuery({
    queryKey: useGetMeQuery.extractKey(),
    queryFn,
  })
}

useGetMeQuery.extractKey = () => v1QueryKeyFactory.users.me.queryKey

export default useGetMeQuery
