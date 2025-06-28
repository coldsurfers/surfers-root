import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { CommonListEmpty } from '../common-list-empty';

export const SearchBottomKeywordResultListEmpty = ({
  isLoadingSearch,
  isFetchedSearch,
}: {
  isLoadingSearch: boolean;
  isFetchedSearch: boolean;
}) => {
  return isLoadingSearch ? (
    <View style={styles.emptyWrapper}>
      <ActivityIndicator size="large" />
    </View>
  ) : isFetchedSearch ? (
    <CommonListEmpty emptyText={'🥺\n앗,\n해당하는\n정보가 없어요!'} />
  ) : null;
};

const styles = StyleSheet.create({
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
