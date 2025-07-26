import { urls } from '../../libs/constants';
import type { PresignedData } from './types';

export const presign = async ({
  type,
  filename,
  filetype,
}: {
  type: 'poster-thumbnails' | 'artist-profile-images';
  filename: string;
  filetype: 'image/*';
}): Promise<PresignedData> => {
  const result = await fetch(
    `${urls.fileUploadPresignedServer}/${type}?filename=${filename}&filetype=${filetype}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  const data = (await result.json()) as PresignedData;

  return data;
};

export const uploadToPresignedURL = async ({ data, file }: { data: PresignedData; file: File }) => {
  const formData = new FormData();

  Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  await fetch(data.url, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    mode: 'cors',
  });
};
