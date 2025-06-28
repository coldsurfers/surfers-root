import { SearchScreen } from '@/screens';
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { useMemo } from 'react';
import type { SearchStackParamList } from './search-stack-navigation.types';

const SearchStack = createNativeStackNavigator<SearchStackParamList>();

const SearchStackNavigation = () => {
  const navigationScreenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      header: () => null,
    }),
    []
  );
  const searchScreenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      header: () => null,
    }),
    []
  );

  return (
    <SearchStack.Navigator screenOptions={navigationScreenOptions}>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={searchScreenOptions}
      />
    </SearchStack.Navigator>
  );
};

export default SearchStackNavigation;
