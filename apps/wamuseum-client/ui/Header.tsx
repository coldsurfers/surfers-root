'use client'

import { useMutation } from '@apollo/client'
import { Button, colors, semantics, Spinner } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { usePathname, useRouter } from 'next/navigation'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { LogoutMutation } from '../gql/mutations'
import { ME_QUERY } from '../gql/queries'
import useMeQuery from '../hooks/useMeQuery'
import { Mutation } from '../src/__generated__/graphql'
import { authUtils } from '../utils'

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const { data, refetch, client } = useMeQuery()
  const [mutateLogout] = useMutation<{ logout: Mutation['logout'] }>(LogoutMutation, {})
  const me = useMemo(() => {
    return data?.me
  }, [data?.me])
  const handleLogout = useCallback(() => {
    setShowLoader(true)
    mutateLogout({
      onCompleted: () => {
        authUtils.logout().then(() => {
          client.refetchQueries({
            include: [ME_QUERY],
          })
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
      <Title onClick={() => router.push('/')}>WAMUSEUM</Title>
      <ButtonPositioner>
        {me && (
          <>
            <Button
              onClick={() => router.push('/register-venue')}
              style={{
                marginRight: 12,
                backgroundColor: colors.oc.yellow[5].value,
              }}
            >
              공연장 등록
            </Button>
            <Button
              onClick={() => router.push('/register-artist')}
              style={{
                marginRight: 12,
                backgroundColor: colors.oc.yellow[5].value,
              }}
            >
              아티스트 등록
            </Button>
            <Button
              onClick={() => router.push('/upload')}
              style={{
                marginRight: 12,
                backgroundColor: colors.oc.yellow[5].value,
              }}
            >
              공연 올리기
            </Button>
            <Button onClick={handleLogout}>로그아웃</Button>
          </>
        )}
      </ButtonPositioner>
      {showLoader && <Spinner variant="page-overlay" />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  height: 68.5px;
  background-color: ${semantics.color.background[2]};

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
