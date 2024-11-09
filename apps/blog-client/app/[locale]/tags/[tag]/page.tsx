import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'

export default function TagDetailPage({
  params,
}: PageProps<{
  tag: string
}>) {
  const { tag, locale } = params
  setRequestLocale(locale)

  return null
}
