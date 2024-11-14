import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

interface Props {
  title: string
  onPressMore?: () => void
}

const GigNewsCollectionList = ({ title, onPressMore }: Props) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity style={styles.sectionMoreButton} onPress={onPressMore}>
        <Text style={styles.sectionMoreTitle}>더 보기</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingRight: 8,
    paddingLeft: 8,
    backgroundColor: colors.oc.white.value,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionMoreButton: {
    marginLeft: 'auto',
  },
  sectionMoreTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.oc.black.value,
  },
  sectionTitle: { color: colors.oc.pink[5].value, fontWeight: '700' },
})

export default memo(GigNewsCollectionList)
