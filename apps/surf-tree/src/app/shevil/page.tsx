import { shevilData } from './(data)'
import { HeroInfo, LinkItem, LinkItemsLayout, PageLayout, TopCard } from './(ui)'

export default function ShevilPage() {
  return (
    <PageLayout>
      <TopCard backgroundImageUrl="/shevil-hero.webp" />
      <HeroInfo title={shevilData.title} subtitle={shevilData.subtitle} />
      <LinkItemsLayout>
        {shevilData.links.map((link) => (
          <LinkItem key={link.title} href={link.url} title={link.title} />
        ))}
      </LinkItemsLayout>
    </PageLayout>
  )
}
