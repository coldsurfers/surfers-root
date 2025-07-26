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
  }: { type: z.infer<typeof InfoMeItemTypeSchema>; count: number; thumbUrl?: string }) => {
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
          navigation.navigate('SubscribedStackNavigation', {
            screen: 'SubscribedConcertListScreen',
            params: {},
          });
        })
        .with('venues', () => {
          navigation.navigate('SubscribedStackNavigation', {
            screen: 'SubscribedVenueListScreen',
            params: {},
          });
        })
        .exhaustive();
    }, [navigation, type]);
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
          style={{ color: semantics.foreground[1], fontSize: 14, marginTop: 8 }}
        >
          {match(type)
            .with('artists', () => `${refinedCount} 아티스트`)
            .with('events', () => `${refinedCount} 공연`)
            .with('venues', () => `${refinedCount} 공연장`)
            .exhaustive()}
        </Text>
      </StyledSubscribeInfoMeContainer>
    );
  }
);
