import { AppLocale } from '@/lib/types/i18n'
import { TypedUseQueryOptions } from '@lukemorales/query-key-factory'
import { useQuery } from '@tanstack/react-query'
import { queryKeyFactory } from '../../react-query.key-factory'

type Options = TypedUseQueryOptions<typeof queryKeyFactory.resumes.detail>

export const useGetResumeQuery = ({ locale }: { locale: AppLocale }, options?: Options) => {
  return useQuery({
    ...options,
    ...queryKeyFactory.resumes.detail({ locale }),
  })
}
