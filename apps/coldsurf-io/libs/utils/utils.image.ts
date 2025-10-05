export const isEmptySource = (src: string) => {
  return !src || src === `${process.env.NEXT_PUBLIC_STATIC_SERVER_HOST}/`
}
