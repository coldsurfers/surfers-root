import {Text, palette} from 'fstvllife-design-system';
import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props {
  title: string;
  onPressMore?: () => void;
}

const GigNewsCollectionList = ({title, onPressMore}: Props) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity style={styles.sectionMoreButton} onPress={onPressMore}>
        <Text style={styles.sectionMoreTitle}>더 보기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingRight: 8,
    paddingLeft: 8,
    backgroundColor: palette.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionMoreButton: {
    marginLeft: 'auto',
  },
  sectionMoreTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.black,
  },
  sectionTitle: {color: palette.pink, fontWeight: '700'},
});

export default memo(GigNewsCollectionList);
