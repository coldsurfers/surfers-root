import React, {memo, ReactElement, useCallback} from 'react';
import {SectionList, SectionListRenderItem} from 'react-native';
import {ConcertCategory} from '../../../types/Concert';
import {ConcertList} from '../ConcertList';
import HeaderItem from './HeaderItem';
import type {
  ConcertCollectionListItemT,
  ConcertCollectionListSection,
  ConcertCollectionListSections,
  ConcertCollectionListSectionT,
} from './types';

interface Props {
  sections: ConcertCollectionListSections;
  onPressItem?: (id: number) => void;
  onPressHeaderItem?: (category: ConcertCategory) => void;
}

const List = ({sections, onPressItem, onPressHeaderItem}: Props) => {
  const renderSectionHeader: (info: {
    section: ConcertCollectionListSection;
  }) => ReactElement = useCallback(
    ({section}) => {
      const onPress = () => {
        onPressHeaderItem &&
          onPressHeaderItem({
            title: section.title,
            id: section.categoryId,
          });
      };
      return <HeaderItem title={section.title} onPressMore={onPress} />;
    },
    [onPressHeaderItem],
  );

  const renderItem: SectionListRenderItem<
    ConcertCollectionListItemT,
    ConcertCollectionListSectionT
  > = useCallback(
    info => {
      const {items} = info.item;
      return <ConcertList data={items} onPressItem={onPressItem} />;
    },
    [onPressItem],
  );

  return (
    <SectionList
      showsVerticalScrollIndicator={false}
      sections={sections}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
      renderItem={renderItem}
    />
  );
};

export default memo(List);
