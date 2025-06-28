import { presign, uploadToPresignedURL } from '@/utils/fetcher';
import { generateS3ImageUrl } from '@/utils/image.utils';
import pickFile from '@/utils/pickFile';
import { Button } from '@coldsurfers/ocean-road';
import { useCallback, useMemo } from 'react';
import {
  ConcertPosterDocument,
  useConcertQuery,
  useCreateConcertPosterMutation,
} from 'src/__generated__/graphql';

export const CreateConcertPosterUI = ({ concertId }: { concertId: string }) => {
  const { data: concertData } = useConcertQuery({
    variables: {
      concertId,
    },
  });

  const [mutateCreateConcertPoster] = useCreateConcertPosterMutation();

  const concert = useMemo(() => {
    if (!concertData?.concert) return null;
    switch (concertData.concert.__typename) {
      case 'HttpError':
        return null;
      case 'Concert':
        return concertData.concert;
      default:
        return null;
    }
  }, [concertData]);
  const onClickCreatePoster = useCallback(() => {
    if (!concert) return;
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
      mutateCreateConcertPoster({
        variables: {
          input: {
            concertId: concert.id,
            key: generateS3ImageUrl('poster-thumbnails', filename).key,
          },
        },
        update: (cache, { data }) => {
          if (!concert) {
            return;
          }
          if (data?.createConcertPoster?.__typename !== 'Poster') {
            return;
          }
          cache.writeQuery({
            query: ConcertPosterDocument,
            variables: {
              concertId: concert.id,
            },
            data: {
              concertPoster: {
                __typename: 'PosterList',
                list: [data.createConcertPoster],
              },
            },
          });
        },
      });
    });
  }, [concert, mutateCreateConcertPoster]);

  return (
    <Button onClick={onClickCreatePoster} style={{ marginTop: 12 }}>
      포스터 등록하기
    </Button>
  );
};
