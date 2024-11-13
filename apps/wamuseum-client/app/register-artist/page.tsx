'use client'

import AddButton from '@/ui/AddButton'
import InputWithLabel from '@/ui/InputWithLabel'
import { presign, uploadToPresignedURL } from '@/utils/fetcher'
import pickFile from '@/utils/pickFile'
import { Button, Spinner, Text, palette } from '@coldsurfers/hotsurf'
import styled from '@emotion/styled'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import useCreateArtist from './mutations/useCreateArtist'

const HeadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`

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
`

const RegisterArtistPage = () => {
  const router = useRouter()
  const [artistName, setArtistName] = useState('')
  const [uploadFileLoading, setUploadFileLoading] = useState(false)
  const [artistProfileImageUrl, setArtistProfileImageUrl] = useState('')
  const [mutate, { loading }] = useCreateArtist({
    onCompleted: () => {
      router.push('/')
    },
  })

  const getThumbnail = useCallback(async () => {
    pickFile(async (e) => {
      const { target } = e
      if (!target) return
      const filename = new Date().toISOString()
      // @ts-ignore
      const { files } = target as unknown
      setUploadFileLoading(true)
      try {
        const presignedData = await presign({
          type: 'artist-profile-images',
          filename,
          filetype: 'image/*',
        })
        await uploadToPresignedURL({
          data: presignedData,
          file: files[0],
        })
        setArtistProfileImageUrl(
          `${process.env.NEXT_PUBLIC_WAMUSEUM_S3_BUCKET_URL}/billets/artist/profile-images/${encodeURIComponent(filename)}`,
        )
      } catch (err) {
        console.error(err)
      } finally {
        setUploadFileLoading(false)
      }
    })
  }, [])

  return (
    <Wrapper>
      <Form>
        <InputWithLabel label="아티스트 등록" value={artistName} onChangeText={setArtistName} />
        <HeadWrapper>
          <Text style={{ fontSize: 16 }}>아티스트 프로필 이미지</Text>
          {artistProfileImageUrl ? (
            <Button
              style={{ width: 10, height: 10, marginLeft: 'auto' }}
              text={'✘'}
              onPress={() => {
                setArtistProfileImageUrl('')
              }}
            />
          ) : (
            <AddButton onPress={getThumbnail} />
          )}
        </HeadWrapper>
        {artistProfileImageUrl && <PosterThumbnail src={artistProfileImageUrl} />}
        <Button
          text={'등록하기'}
          style={{ marginTop: 10, backgroundColor: palette.black }}
          onPress={() => {
            mutate({
              variables: {
                input: {
                  artistName,
                  imageURL: artistProfileImageUrl,
                },
              },
            })
          }}
        />
      </Form>
      {loading || uploadFileLoading ? <Spinner /> : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  border-radius: 3px;

  margin-top: 32px;

  width: 900px;

  background-color: ${palette.white};
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`

export default RegisterArtistPage
