export const getPosterS3Url = (filename: string) => {
  return `${process.env.NEXT_PUBLIC_WAMUSEUM_S3_BUCKET_URL}/billets/poster-thumbnails/${encodeURIComponent(filename)}`
}
