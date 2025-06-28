export const generateS3ImageUrl = (
  keyPrefix: 'poster-thumbnails' | 'artist/profile-images',
  filename: string
) => {
  const key = `billets/${keyPrefix}/${filename}`;
  return {
    url: `${process.env.NEXT_PUBLIC_WAMUSEUM_S3_BUCKET_URL}/${key}`,
    key,
  };
};
