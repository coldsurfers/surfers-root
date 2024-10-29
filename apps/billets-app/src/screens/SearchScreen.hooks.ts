import {useNavigation, useRoute} from '@react-navigation/native';
import {SearchScreenProp} from './SearchScreen.types';

export const useSearchScreenNavigation = () =>
  useNavigation<SearchScreenProp['navigation']>();
export const useSearchScreenRoute = () => useRoute<SearchScreenProp['route']>();
