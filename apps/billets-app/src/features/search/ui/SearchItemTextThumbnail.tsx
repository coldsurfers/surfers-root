import {Text} from '@coldsurfers/hotsurf';
import {View} from 'react-native';
import palettes from '../../../lib/palettes';
import {SEARCH_ITEM_THUMBNAIL_SIZE} from './constants';

export default function SearchItemTextThumbnail({text}: {text: string}) {
  return (
    <View
      style={{
        width: SEARCH_ITEM_THUMBNAIL_SIZE,
        height: SEARCH_ITEM_THUMBNAIL_SIZE,
        borderRadius: SEARCH_ITEM_THUMBNAIL_SIZE / 2,
        backgroundColor: palettes.lightblue['300'],
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text weight="bold" style={{color: palettes.white}}>
        {text}
      </Text>
    </View>
  );
}
