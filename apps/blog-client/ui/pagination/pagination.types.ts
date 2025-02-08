import { AppLocale } from '@/lib/types/i18n'
import { Series } from '@/lib/types/series'

export type PaginationProps = {
  series: Series | null
  currentPage: number
  totalPage: number
  appLocale: AppLocale
}
