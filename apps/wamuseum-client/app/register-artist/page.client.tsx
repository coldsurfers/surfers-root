'use client'

import { CopyrightForm, CopyrightModal } from '@/features'
import { AddButton } from '@/ui'
import InputWithLabel from '@/ui/InputWithLabel'
import { presign, uploadToPresignedURL } from '@/utils/fetcher'
import pickFile from '@/utils/pickFile'
import { Button, Spinner, Text, colors } from '@coldsurfers/ocean-road'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useCreateArtistMutation, useCreateCopyrightMutation } from 'src/__generated__/graphql'
import {
  StyledCopyrightSection,
  StyledForm,
  StyledHeadWrapper,
  StyledPosterThumbnail,
  StyledWrapper,
} from './page.styled'

export const RegisterArtistPageClient = () => {
  const router = useRouter()
  const [artistName, setArtistName] = useState('')
  const [uploadFileLoading, setUploadFileLoading] = useState(false)
  const [artistProfileImageUrl, setArtistProfileImageUrl] = useState('')
  const [createArtist, { loading: loadingCreateArtist }] = useCreateArtistMutation()
  const [createCopyright, { loading: loadingCreateCopyright }] = useCreateCopyrightMutation()
  const [copyrightModalVisible, setCopyrightModalVisible] = useState(false)
  const [copyrightForm, setCopyrightForm] = useState<CopyrightForm | null>(null)

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
    createArtist({
      variables: {
        input: {
          artistName,
          imageURL: artistProfileImageUrl,
        },
      },
      onCompleted: (data) => {
        if (data.createArtist?.__typename === 'ArtistWithProfileImage') {
          const artistProfileImageId = data.createArtist.artistProfileImage?.id
          if (artistProfileImageId && !!copyrightForm) {
            createCopyright({
              variables: {
                input: {
                  artistProfileImageId,
                  owner: copyrightForm.owner,
                  license: copyrightForm.license,
                },
              },
              onCompleted: () => {
                router.push('/')
              },
            })
          }
        }
      },
    })
  }, [artistName, artistProfileImageUrl, copyrightForm, createArtist, createCopyright, router])

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
        {artistProfileImageUrl && (
          <StyledCopyrightSection>
            <Text>잠깐, 사진에 저작권이 있나요?</Text>
            <Button onClick={() => setCopyrightModalVisible(true)}>저작권 등록하기</Button>
            {copyrightForm && (
              <Button theme="pink" onClick={() => setCopyrightForm(null)}>
                삭제하기
              </Button>
            )}
            {copyrightForm && (
              <form>
                <InputWithLabel
                  disabled
                  label="저작자 이름"
                  value={copyrightForm?.owner ?? ''}
                  onChangeText={() => {}}
                />
                <InputWithLabel
                  disabled
                  label="라이센스"
                  value={copyrightForm?.license ?? ''}
                  onChangeText={() => {}}
                />
              </form>
            )}
          </StyledCopyrightSection>
        )}
        <Button style={{ marginTop: 10, backgroundColor: colors.oc.black.value }} onClick={onClickRegisterArtist}>
          등록하기
        </Button>
      </StyledForm>
      {loadingCreateArtist || loadingCreateCopyright || uploadFileLoading ? <Spinner variant="page-overlay" /> : null}
      <CopyrightModal
        visible={copyrightModalVisible}
        onConfirm={(form) => {
          setCopyrightModalVisible(false)
          setCopyrightForm(form)
        }}
        onClose={() => setCopyrightModalVisible(false)}
      />
    </StyledWrapper>
  )
}
