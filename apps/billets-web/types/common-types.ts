export type PageProps<T extends { [key: string]: string }> = {
  params: T
  searchParams: Record<string, never>
}
