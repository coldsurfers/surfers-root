import { presign, uploadToPresignedURL } from '@/utils/fetcher';
import { generateS3ImageUrl } from '@/utils/image.utils';
import pickFile from '@/utils/pickFile';
import { Button } from '@coldsurfers/ocean-road';
import { useCallback, useMemo } from 'react';
import {
  ConcertPosterDocument,
  useConcertPosterQuery,
  useUpdateConcertPosterMutation,
} from 'src/__generated__/graphql';
import { StyledUpdateConcertPosterUIThumbnail } from './update-concert-poster-ui.styled';

interface Props {
  concertId: string;
}

export const UpdateConcertPosterUI = ({ concertId }: Props) => {
  const { data: concertPosterData } = useConcertPosterQuery({
    variables: {
      concertId,
    },
  });
  const [mutateUpdateConcertPoster] = useUpdateConcertPosterMutation();
  const concertPoster = useMemo(() => {
    if (concertPosterData?.concertPoster?.__typename === 'PosterList') {
      return concertPosterData.concertPoster.list?.at(0);
    }
    return null;
  }, [concertPosterData]);

  const onClickUpdatePoster = useCallback(async () => {
    if (!concertPoster) return;
    pickFile(async (e) => {
      const { target } = e;
      if (!target) return;
      const filename = new Date().toISOString();
      // @ts-expect-error
      const { files } = target;
      const presignedData = await presign({
        filename,
        filetype: 'image/*',
        type: 'poster-thumbnails',
      });
      await uploadToPresignedURL({
        data: presignedData,
        file: files[0],
      });
      mutateUpdateConcertPoster({
        variables: {
          input: {
            id: concertPoster.id,
            key: generateS3ImageUrl('poster-thumbnails', filename).key,
          },
        },
        update: (cache, { data }) => {
          if (!data || !data.updateConcertPoster) return;
          const { updateConcertPoster } = data;
          if (updateConcertPoster.__typename !== 'Poster') return;
          const existingConcertPoster = cache.readQuery({ query: ConcertPosterDocument });
          if (existingConcertPoster && updateConcertPoster) {
            cache.writeQuery({
              query: ConcertPosterDocument,
              variables: {
                concertId,
              },
              data: {
                ...existingConcertPoster,
                concertPoster: {
                  list: [updateConcertPoster],
                },
              },
            });
          }
        },
      });
    });
  }, [concertId, concertPoster, mutateUpdateConcertPoster]);

  return (
    <>
      <StyledUpdateConcertPosterUIThumbnail src={concertPoster?.imageURL ?? ''} />
      <Button onClick={onClickUpdatePoster} style={{ marginTop: 12 }}>
        포스터 변경하기
      </Button>
    </>
  );
};
