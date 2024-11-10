import { fetchGetLogs } from '@/lib/fetchers'
import { useQuery } from '@tanstack/react-query'
import { AppLocale } from 'i18n/types'

export const useGetLogsQuery = ({ platform, locale }: { platform: 'techlog' | 'surflog'; locale: AppLocale }) => {
  return useQuery({
    queryKey: ['logs', { platform, locale }],
    queryFn: async () => await fetchGetLogs({ platform, locale }),
  })
}
