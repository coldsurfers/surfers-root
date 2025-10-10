import { ShareBottomSheet } from '@/features/share/ui';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { forwardRef, useRef } from 'react';
import type { View } from 'react-native';
import { useConcertDetail } from '../../hooks/useConcertDetail';
import { ConcertDetailShareView } from './concert-detail-share-view';

type Props = {
  eventId: string;
};

export const ConcertDetailShareBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ eventId }, ref) => {
    const shareViewRef = useRef<View>(null);
    const { metaDescription, httpLink, thumbnails, eventData } = useConcertDetail({
      id: eventId,
    });
    return (
      <ShareBottomSheet
        ref={ref}
        shareViewRef={shareViewRef}
        attributionURL={httpLink}
        text={metaDescription}
        shareView={
          <ConcertDetailShareView
            ref={shareViewRef}
            thumbnailUrl={thumbnails.at(0) ?? ''}
            title={eventData.data.title}
            venue={eventData.data.venues.at(0)?.name ?? ''}
            date={eventData.data.date}
          />
        }
      />
    );
  }
);
