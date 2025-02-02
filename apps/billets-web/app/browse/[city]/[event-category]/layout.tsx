import { HydrationBoundary } from '@tanstack/react-query'
import { ReactNode } from 'react'

export const dynamic = 'force-dynamic'

async function LayoutInner({ children, eventCategory }: { children: ReactNode; eventCategory: string }) {
  return <HydrationBoundary>{children}</HydrationBoundary>
}

export default function BrowseByCityEventCategoryLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { ['event-category']: string }
}) {
  const eventCategory = params['event-category']
  return <LayoutInner eventCategory={eventCategory}>{children}</LayoutInner>
}
