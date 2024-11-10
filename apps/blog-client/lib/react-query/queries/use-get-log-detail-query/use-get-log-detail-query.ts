import { getTechlogDetail } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { AppLocale } from 'i18n/types'
import { match } from 'ts-pattern'

export const useGetLogDetailQuery = ({
  platform,
  slug,
  locale,
}: {
  platform: 'techlog' | 'surflog'
  slug: string
  locale: AppLocale
}) => {
  return useQuery({
    queryKey: ['log-detail', { platform, slug, locale }],
    queryFn: async () => {
      return await match(platform).with('techlog', () => getTechlogDetail({ slug, lang: locale }))
    },
  })
}
