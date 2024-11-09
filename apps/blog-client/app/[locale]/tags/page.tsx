import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'

export default function TagsPage({ params }: PageProps) {
  const { locale } = params
  setRequestLocale(locale)
  return null
}
