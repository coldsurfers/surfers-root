import { withHapticPress } from '@/lib';
import { getEventCategoryUIName } from '@/lib/utils.event-category';
import { useHomeScreenNavigation } from '@/screens';
import type { components } from '@/types/api';
import { useColorScheme } from '@coldsurfers/ocean-road/native';
import { memo, useCallback } from 'react';
import {
  StyledEventCategoryButton,
  StyledEventCategoryButtonText,
} from './event-category-list.styled';
import { getUiIcon } from './event-category-list.utils';

export const EventCategoryListItem = memo(
  (props: components['schemas']['EventCategoryDTOSchema']) => {
    const { semantics } = useColorScheme();
    const navigation = useHomeScreenNavigation();
    const onPress = useCallback(() => {
      navigation.navigate('EventStackNavigation', {
        params: {
          eventCategory: props.name,
        },
        screen: 'EventCategoryScreen',
      });
    }, [navigation, props.name]);
    return (
      <StyledEventCategoryButton
        onPress={withHapticPress(onPress)}
        style={{
          backgroundColor: semantics.background[4],
        }}
      >
        {getUiIcon(props.name)}
        <StyledEventCategoryButtonText weight="medium" style={{ color: semantics.foreground[1] }}>
          {getEventCategoryUIName(props.name)}
        </StyledEventCategoryButtonText>
      </StyledEventCategoryButton>
    );
  }
);
