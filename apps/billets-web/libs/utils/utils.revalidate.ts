import { match } from 'ts-pattern'

export const REVALIDATE_TAGS = {
  eventList: ['event', 'list'],
  eventDetail: ['event', 'detail'],
  eventCategoryList: ['event-category', 'list'],
  countryList: ['country', 'list'],
}

export const generateRevalidateOptions = ({
  revalidateFreq,
  tags,
}: {
  revalidateFreq: 'high' | 'medium' | 'low'
  tags?: string[]
}): NextFetchRequestConfig => {
  return {
    revalidate: match(revalidateFreq)
      .with('high', () => 60 * 10)
      .with('medium', () => 60 * 30)
      .with('low', () => 60 * 60)
      .exhaustive(),
    tags,
  }
}
