export type Link = {
  title: string
  url: string
  isHighlighted?: boolean
}

export type TreeData = {
  title: string
  subtitle: string
  links: Link[]
  profileImageUrl: string
}
