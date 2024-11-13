import { useQuery } from '@tanstack/react-query'
import client from '../../api/openapi-client'
import { v1QueryKeyFactory } from '../../query-key-factory'

const queryFn = async () => {
  const data = await client.GET('/v1/user/me')
  return data.data ?? null
}

function useGetMeQuery() {
  return useQuery({
    queryKey: useGetMeQuery.extractKey(),
    queryFn,
    retry: false,
  })
}

useGetMeQuery.extractKey = () => v1QueryKeyFactory.users.me.queryKey

export default useGetMeQuery
