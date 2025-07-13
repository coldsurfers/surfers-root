'use client';

import { apiClient } from '@/libs/openapi-client';
import { Text } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const SectionTitle = styled(Text)``;

export default function HandleDetailPage() {
  const params = useParams() as {
    handle?: string;
  };
  const paramsHandle = useMemo(() => {
    if (!params.handle) {
      return null;
    }
    return decodeURIComponent(params.handle).split('@').join('');
  }, [params.handle]);
  const { data: userData } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });

  // @TODO: get public-user data from api

  const isAuthenticated = useMemo(() => {
    if (!userData?.handle) {
      return false;
    }
    if (!paramsHandle) {
      return false;
    }
    return userData.handle === paramsHandle;
  }, [userData?.handle, paramsHandle]);

  return (
    <div>
      <SectionTitle as="h1">찜한 공연 {isAuthenticated.toString()}</SectionTitle>
    </div>
  );
}
