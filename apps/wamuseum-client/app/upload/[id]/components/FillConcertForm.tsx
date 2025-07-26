'use client';

import { AddButton } from '@/ui';
import { presign, uploadToPresignedURL } from '@/utils/fetcher';
import { generateS3ImageUrl } from '@/utils/image.utils';
import pickFile from '@/utils/pickFile';
import { Button, Spinner, Text, colors } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { type MouseEventHandler, useCallback, useState } from 'react';
import { useCreateConcertPosterMutation } from 'src/__generated__/graphql';

const Form = styled.form`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  border-radius: 3px;

  margin-top: 32px;

  width: 900px;

  background-color: ${colors.oc.white.value};
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const HeadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const PosterThumbnail = styled.img`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  object-fit: contain;
`;

const FillConcertForm = ({ concertId }: { concertId: string }) => {
  const router = useRouter();
  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [mutate, { loading }] = useCreateConcertPosterMutation({
    onCompleted: () => {
      router.push('/');
    },
  });
  const [posterInfo, setPosterInfo] = useState<{
    s3Url: string;
    key: string;
  }>({
    s3Url: '',
    key: '',
  });
  const getThumbnail = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    pickFile(async (e) => {
      const { target } = e;
      if (!target) return;
      const filename = new Date().toISOString();
      // @ts-expect-error
      const { files } = target;
      setUploadFileLoading(true);
      try {
        const presignedData = await presign({
          type: 'poster-thumbnails',
          filename,
          filetype: 'image/*',
        });
        await uploadToPresignedURL({
          data: presignedData,
          file: files[0],
        });
        const { url, key } = generateS3ImageUrl('poster-thumbnails', filename);
        setPosterInfo({
          s3Url: url,
          key,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setUploadFileLoading(false);
      }
    });
  }, []);

  const createPoster = useCallback(() => {
    mutate({
      variables: {
        input: {
          concertId,
          key: posterInfo.key,
        },
      },
    });
  }, [concertId, mutate, posterInfo.key]);

  return (
    <Wrapper>
      <Form onSubmit={(e) => e.preventDefault()}>
        <HeadWrapper>
          <Text style={{ fontSize: 16 }}>공연 포스터</Text>
          {posterInfo.s3Url ? (
            <Button
              style={{ width: 10, height: 10, marginLeft: 'auto' }}
              onClick={() => {
                setPosterInfo({
                  s3Url: '',
                  key: '',
                });
              }}
            >
              ✘
            </Button>
          ) : (
            <AddButton onClick={getThumbnail} />
          )}
        </HeadWrapper>
        {posterInfo.s3Url && <PosterThumbnail src={posterInfo.s3Url} />}
        <Button
          style={{ marginTop: 10, backgroundColor: colors.oc.black.value }}
          onClick={createPoster}
        >
          다음
        </Button>
      </Form>
      {loading || uploadFileLoading ? <Spinner variant="page-overlay" /> : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default FillConcertForm;
