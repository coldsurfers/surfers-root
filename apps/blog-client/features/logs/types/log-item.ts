import { AppLocale } from '@/lib/types/i18n'
import { LogPlatform } from './platform'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type LogItem = {
  id: string
  createdTime: Date
  lastEditedTime: Date
  dateLocale: string
  slug: any
  title: any
  status: any
  writer: any
  lang: AppLocale
  platform: LogPlatform
  thumbnailUrl: string | null
}
