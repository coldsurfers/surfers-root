import { HomeFeedItem } from '..'

export function HomeFeedList() {
  return Array.from({ length: 10 }).map((_, index) => <HomeFeedItem key={index} />)
}
