'use client';

import { apiClient } from '@/libs/openapi-client';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ProfileDetailTop } from '../../ui';

type Props = {
  artistId: string;
};

export const ArtistProfileDetailTop = ({ artistId }: Props) => {
  const { data: artistDetail } = useQuery({
    queryKey: apiClient.artist.queryKeys.detail(artistId),
    queryFn: () => apiClient.artist.getArtistDetail(artistId),
  });

  const thumbUrl = useMemo(() => {
    if (!artistDetail?.thumbUrl) {
      return '';
    }
    return `${artistDetail.thumbUrl}`;
  }, [artistDetail?.thumbUrl]);

  const imgModalThumbUrl = useMemo(() => {
    if (!artistDetail?.thumbUrl) {
      return '';
    }
    return `${artistDetail.thumbUrl}`;
  }, [artistDetail?.thumbUrl]);

  const thumbCopyright = useMemo(() => {
    return artistDetail?.thumbCopyright ?? undefined;
  }, [artistDetail?.thumbCopyright]);

  return (
    <ProfileDetailTop
      profileKind="Artist"
      title={artistDetail?.name ?? ''}
      thumbUrl={thumbUrl}
      imgModalThumbUrl={imgModalThumbUrl}
      thumbCopyright={thumbCopyright}
    />
  );
};
