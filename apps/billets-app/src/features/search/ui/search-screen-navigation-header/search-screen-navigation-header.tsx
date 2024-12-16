import { NavigationHeader } from '@/ui/navigation-header'
import { TextInput } from '@coldsurfers/ocean-road/native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { memo, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useShallow } from 'zustand/shallow'
import { useSearchStore } from '../../store/search-store'

export const SearchScreenNavigationHeader = memo((props: NativeStackHeaderProps) => {
  const [placeholder, setPlaceholder] = useState('🔎 어떤 공연을 찾고 싶으세요?')
  const { keyword, setKeyword } = useSearchStore(
    useShallow((state) => ({
      keyword: state.keyword,
      setKeyword: state.setKeyword,
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
})
