import {
  ProfileDetailPageLayout,
  UserProfileDetailEventList,
  UserProfileDetailTop,
} from '@/features/profile';
import { apiClient } from '@/libs/openapi-client';
import { getQueryClient } from '@/libs/utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

export default async function HandleDetailPage({ params }: { params: { handle: string } }) {
  const paramsHandle = decodeURIComponent((await params).handle);
  const queryClient = getQueryClient();
  const user = await queryClient.fetchQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });

  await queryClient.prefetchQuery({
    queryKey: apiClient.user.queryKeys.profile(paramsHandle),
    queryFn: () => apiClient.user.getUserProfile(paramsHandle),
  });

  // @TODO: add modify handle button ui
  const isAuthenticated = (() => {
    if (!user?.handle) {
      return false;
    }
    if (!paramsHandle) {
      return false;
    }
    return user.handle === paramsHandle;
  })();

  if (!paramsHandle) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileDetailPageLayout>
        <UserProfileDetailTop handle={paramsHandle} />
        <UserProfileDetailEventList handle={paramsHandle} />
      </ProfileDetailPageLayout>
    </HydrationBoundary>
  );
}
