import { useNavigation, useRoute } from '@react-navigation/native'
import { SearchScreenProps } from './search-screen.types'

export const useSearchScreenNavigation = () => useNavigation<SearchScreenProps['navigation']>()
export const useSearchScreenRoute = () => useRoute<SearchScreenProps['route']>()
