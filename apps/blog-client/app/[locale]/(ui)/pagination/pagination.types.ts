import { LogPlatform } from '@/features'

export type PaginationProps = {
  currPage: number
  wholePage: number
  platform: LogPlatform | null
}
