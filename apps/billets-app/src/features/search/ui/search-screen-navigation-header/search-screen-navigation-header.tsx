import { NavigationHeader } from '@/ui/navigation-header'
import { colors } from '@coldsurfers/ocean-road'
import { Button, Text, TextInput } from '@coldsurfers/ocean-road/native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { X as XIcon } from 'lucide-react-native'
import { memo, useCallback, useMemo, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useShallow } from 'zustand/shallow'
import { getSearchFilterUIValue } from '../../store'
import { useSearchStore } from '../../store/search-store'
import { FULLY_EXPANDED_SNAP_INDEX } from '../../store/search-store.constants'

export const SearchScreenNavigationHeader = memo((props: NativeStackHeaderProps) => {
  const [placeholder, setPlaceholder] = useState('🔎 어떤 공연을 찾고 싶으세요?')
  const { keyword, setKeyword } = useSearchStore(
    useShallow((state) => ({
      keyword: state.keyword,
      setKeyword: state.setKeyword,
    })),
  )
  const { selectedLocationFilter, setSelectedLocationFilter } = useSearchStore(
    useShallow((state) => ({
      selectedLocationFilter: state.selectedLocationFilter,
      setSelectedLocationFilter: state.setSelectedLocationFilter,
    })),
  )
  const { setSnapIndex, setViewMode } = useSearchStore(
    useShallow((state) => ({
      setSnapIndex: state.setSnapIndex,
      setViewMode: state.setViewMode,
    })),
  )
  const { setLocationConcerts } = useSearchStore(
    useShallow((state) => ({
      setLocationConcerts: state.setLocationConcerts,
    })),
  )
  const options = useMemo(
    () => ({
      ...props.options,
      title: '검색',
      headerBackVisible: false,
    }),
    [props.options],
  )

  const onPressFilterXIcon = useCallback(() => {
    setSelectedLocationFilter(null)
    setSnapIndex(FULLY_EXPANDED_SNAP_INDEX)
    setViewMode('list')
    setLocationConcerts([])
  }, [setLocationConcerts, setSelectedLocationFilter, setSnapIndex, setViewMode])

  return (
    <NavigationHeader
      {...props}
      options={options}
      searchBarComponent={
        <View style={styles.topInputWrapper}>
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            onFocus={() => setPlaceholder('')}
            onBlur={() => setPlaceholder('🔎 어떤 공연을 찾고 싶으세요?')}
            autoCapitalize="none"
            placeholder={placeholder}
            clearButtonMode="while-editing"
          />
          <View style={styles.filters}>
            {selectedLocationFilter !== null && (
              <Button size="sm" theme="border" style={styles.filterBtn}>
                <Text style={styles.filterText}>{getSearchFilterUIValue(selectedLocationFilter)}</Text>
                {selectedLocationFilter !== 'current-location' && (
                  <Pressable
                    hitSlop={{
                      top: 8,
                      left: 8,
                      right: 8,
                      bottom: 8,
                    }}
                    onPress={onPressFilterXIcon}
                    style={styles.filterXIconBtn}
                  >
                    <XIcon size={14} color={colors.oc.black.value} strokeWidth={3} />
                  </Pressable>
                )}
              </Button>
            )}
          </View>
        </View>
      }
    />
  )
})

const styles = StyleSheet.create({
  topInputWrapper: {
    paddingTop: 14,
    paddingBottom: 8,
    paddingHorizontal: 14,
  },
  filters: {
    marginTop: 14,
  },
  filterText: { fontSize: 12 },
  filterXIconBtn: { marginLeft: 4 },
  filterBtn: {
    alignSelf: 'baseline',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
