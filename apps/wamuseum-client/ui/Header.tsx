import { Button, palette } from '@coldsurfers/hotsurf'
import { useRouter, usePathname } from 'next/navigation'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import useMeQuery from '../hooks/useMeQuery'
import storage from '../utils/storage/storage'
import Loader from './Loader'
import { ME_QUERY } from '../gql/queries'
import { LogoutMutation } from '../gql/mutations'
import { Mutation } from '../src/__generated__/graphql'

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const { data, loading: meLoading, refetch, client } = useMeQuery()
  const [mutateLogout] = useMutation<{ logout: Mutation['logout'] }>(
    LogoutMutation,
    {}
  )
  const me = useMemo(() => {
    if (!data || meLoading) return null
    // eslint-disable-next-line no-shadow
    const { me } = data
    return me
  }, [data, meLoading])
  const handleLogout = useCallback(() => {
    setShowLoader(true)
    mutateLogout({
      onCompleted: () => {
        storage.remove('@wamuseum-client/auth-token')
        client.refetchQueries({
          include: [ME_QUERY],
        })
      },
      onError: (error) => {
        console.error(error)
      },
    })
    setShowLoader(false)
  }, [client, mutateLogout])

  useEffect(() => {
    refetch()
  }, [pathname, refetch])

  return (
    <Wrapper>
      <Title onClick={() => router.push('/')}>ColdSurf 어드민</Title>
      <ButtonPositioner>
        {me && (
          <>
            <Button
              onPress={() => router.push('/register-venue')}
              text="공연장 등록"
              style={{
                marginRight: 12,
                backgroundColor: palette.yellow,
              }}
            />
            <Button
              onPress={() => router.push('/register-artist')}
              text="아티스트 등록"
              style={{
                marginRight: 12,
                backgroundColor: palette.yellow,
              }}
            />
            <Button
              onPress={() => router.push('/upload')}
              text="공연 올리기"
              style={{
                marginRight: 12,
                backgroundColor: palette.yellow,
              }}
            />
            <Button onPress={handleLogout} text="로그아웃" />
          </>
        )}
      </ButtonPositioner>
      {showLoader && <Loader />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  height: 68.5px;
  background-color: ${palette.white};

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`

const Title = styled.h3`
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
`

const ButtonPositioner = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`

export default memo(Header)
