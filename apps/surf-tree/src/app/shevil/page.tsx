import { shevilData } from './(data)'
import { HeroInfo, PageLayout, TopCard } from './(ui)'

export default function ShevilPage() {
  return (
    <PageLayout>
      <TopCard backgroundImageUrl="/shevil-hero.webp" />
      <HeroInfo title={shevilData.name} subtitle={shevilData.email} />
    </PageLayout>
  )
}
