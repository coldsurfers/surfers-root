import { useUserCurrentLocationStore } from '@/features/location/stores'
import { Text, TextInput } from '@coldsurfers/ocean-road/native'
import { useCallback, useMemo, useState } from 'react'
import { SectionList, SectionListData, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import palettes from '../../lib/palettes'
import { LatLng } from '../../types/LatLng'
import { useLocationSelectionScreenNavigation } from './location-selection-screen.hooks'

const sections: ReadonlyArray<
  SectionListData<
    {
      city: string
      latLng: LatLng
    },
    {
      country: string
    }
  >
> = [
  {
    country: 'South Korea',
    data: [
      {
        city: 'Seoul',
        latLng: {
          latitude: 37.5326,
          longitude: 127.024612,
        },
      },
      {
        city: 'Incheon',
        latLng: {
          latitude: 37.456257,
          longitude: 126.705208,
        },
      },
      {
        city: 'YeongJongDo',
        latLng: {
          latitude: 37.5000629,
          longitude: 126.5358479,
        },
      },
    ],
  },
]

export const LocationSelectionScreen = () => {
  const navigation = useLocationSelectionScreenNavigation()
  const setUserCurrentLocation = useUserCurrentLocationStore((state) => state.setUserCurrentLocation)
  const [searchKeyword, setSearchKeyword] = useState('')

  const searchedSections = useMemo(() => {
    return sections.filter(
      (section) =>
        section.country.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        section.data.some((item) => item.city.toLowerCase().includes(searchKeyword.toLowerCase())),
    )
  }, [searchKeyword])

  const renderSectionHeader = useCallback(
    (info: { section: SectionListData<{ city: string; latLng: LatLng }, { country: string }> }) => {
      return (
        <View>
          <Text style={styles.sectionHeader}>{info.section.country}</Text>
        </View>
      )
    },
    [],
  )

  const renderItem = useCallback(
    (info: { item: { city: string; latLng: LatLng } }) => {
      const onPress = () => {
        setUserCurrentLocation(info.item.latLng)
        navigation.goBack()
      }
      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.itemText}>{info.item.city}</Text>
        </TouchableOpacity>
      )
    },
    [navigation, setUserCurrentLocation],
  )

  return (
    <SafeAreaView style={styles.wrapper}>
      <TextInput
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        placeholder="위치 검색 🔍"
        clearButtonMode="while-editing"
      />
      <SectionList
        sections={searchedSections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        style={styles.listWrapper}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: palettes.gray['200'],
    paddingHorizontal: 12,
  },
  listWrapper: { flex: 1 },
  listContainer: {
    flexGrow: 1,
    paddingTop: 24,
  },
  sectionHeader: { fontSize: 18, fontWeight: '500' },
  itemText: { fontSize: 16 },
})
