import { useMyScreenNavigation } from '@/screens/my-screen';
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { memo, useCallback, useMemo } from 'react';
import { match } from 'ts-pattern';
import type { z } from 'zod';
import {
  StyledSubscribeInfoMeContainer,
  StyledSubscribeInfoMeItem,
  StyledSubscribeInfoMeItemImage,
} from './subscribe-info-me.styled';
import type { InfoMeItemTypeSchema } from './subscribe-info-me.types';

const refineCount = (count: number) => {
  if (count > 99) {
    return '99+';
  }
  return count;
};

export const SubscribeInfoMeItem = memo(
  ({
    type,
    count,
    thumbUrl,
    title,
    eventId,
  }: {
    type: z.infer<typeof InfoMeItemTypeSchema>;
    count: number;
    thumbUrl?: string;
    title: string;
    eventId: string;
  }) => {
    const { semantics } = useColorScheme();
    const refinedCount = useMemo(() => refineCount(count), [count]);
    const navigation = useMyScreenNavigation();

    const onPress = useCallback(() => {
      match(type)
        .with('artists', () => {
          navigation.navigate('SubscribedStackNavigation', {
            screen: 'SubscribedArtistListScreen',
            params: {},
          });
        })
        .with('events', () => {
          navigation.navigate('EventStackNavigation', {
            screen: 'EventDetailScreen',
            params: { eventId },
          });
        })
        .with('venues', () => {
          navigation.navigate('SubscribedStackNavigation', {
            screen: 'SubscribedVenueListScreen',
            params: {},
          });
        })
        .exhaustive();
    }, [navigation, type, eventId]);
    return (
      <StyledSubscribeInfoMeContainer onPress={onPress}>
        <StyledSubscribeInfoMeItem
          style={{
            borderColor: semantics.border[1],
          }}
        >
          {thumbUrl ? <StyledSubscribeInfoMeItemImage source={{ uri: thumbUrl }} /> : null}
        </StyledSubscribeInfoMeItem>
        <Text
          weight="medium"
          style={{ color: semantics.foreground[1], fontSize: 14, marginTop: 8, maxWidth: 100 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {match(type)
            .with('artists', () => `${refinedCount} 아티스트`)
            .with('events', () => title)
            .with('venues', () => `${refinedCount} 공연장`)
            .exhaustive()}
        </Text>
      </StyledSubscribeInfoMeContainer>
    );
  }
);
