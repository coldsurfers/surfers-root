'use client';

import { useApollo } from '@/libs';
import { Button, Spinner, colors, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useLogoutMutation, useMeQuery } from '../../src/__generated__/graphql';
import { authUtils } from '../../utils';

export const Header = () => {
  const router = useRouter();
  const apollo = useApollo({});
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { data } = useMeQuery();
  const [mutateLogout] = useLogoutMutation();
  const me = useMemo(() => {
    return data?.me;
  }, [data?.me]);
  const handleLogout = useCallback(() => {
    setShowLoader(true);
    mutateLogout({
      onCompleted: () => {
        authUtils.localLogout().then(() => {
          apollo.cache.reset().then(() => {
            router.push('/auth/signin');
          });
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
    setShowLoader(false);
  }, [apollo.cache, mutateLogout, router]);

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
            <Button
              onClick={() => router.push('/generate-banner')}
              style={{
                marginRight: 12,
                backgroundColor: colors.oc.yellow[5].value,
              }}
            >
              배너 만들기
            </Button>
            <Button
              onClick={() => router.push('/generate-appstore-banner')}
              style={{
                marginRight: 12,
                backgroundColor: colors.oc.yellow[5].value,
              }}
            >
              앱 스토어 배너 만들기
            </Button>
            <Button
              onClick={() => router.push('/generate-album-cover')}
              style={{
                marginRight: 12,
                backgroundColor: colors.oc.red[5].value,
              }}
            >
              앨범 커버 만들기
            </Button>
            <Button onClick={handleLogout}>로그아웃</Button>
          </>
        )}
      </ButtonPositioner>
      {showLoader && <Spinner variant="page-overlay" />}
    </Wrapper>
  );
};

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
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
`;

const ButtonPositioner = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;
