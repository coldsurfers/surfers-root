'use client'

import { AddButton } from '@/ui'
import InputWithLabel from '@/ui/InputWithLabel'
import { presign, uploadToPresignedURL } from '@/utils/fetcher'
import pickFile from '@/utils/pickFile'
import { Button, Spinner, Text, colors } from '@coldsurfers/ocean-road'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import useCreateArtist from './mutations/useCreateArtist'
import { StyledForm, StyledHeadWrapper, StyledPosterThumbnail, StyledWrapper } from './page.styled'

export const RegisterArtistPageClient = () => {
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

  const onClickRegisterArtist = useCallback(() => {
    mutate({
      variables: {
        input: {
          artistName,
          imageURL: artistProfileImageUrl,
        },
      },
    })
  }, [artistName, artistProfileImageUrl, mutate])

  return (
    <StyledWrapper>
      <StyledForm onSubmit={(e) => e.preventDefault()}>
        <InputWithLabel label="아티스트 등록" value={artistName} onChangeText={setArtistName} />
        <StyledHeadWrapper>
          <Text style={{ fontSize: 16 }}>아티스트 프로필 이미지</Text>
          {artistProfileImageUrl ? (
            <Button
              style={{ width: 10, height: 10, marginLeft: 'auto' }}
              onClick={() => {
                setArtistProfileImageUrl('')
              }}
            >
              ✘
            </Button>
          ) : (
            <AddButton onClick={getThumbnail} />
          )}
        </StyledHeadWrapper>
        {artistProfileImageUrl && <StyledPosterThumbnail src={artistProfileImageUrl} />}
        <Button style={{ marginTop: 10, backgroundColor: colors.oc.black.value }} onClick={onClickRegisterArtist}>
          등록하기
        </Button>
      </StyledForm>
      {loading || uploadFileLoading ? <Spinner variant="page-overlay" /> : null}
    </StyledWrapper>
  )
}
