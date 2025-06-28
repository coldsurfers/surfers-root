import { useUserCurrentLocationStore } from '@/features/location/stores';
import { apiClient } from '@/lib/api/openapi-client';
import { CommonScreenLayout } from '@/ui';
import { Spinner, Text, TextInput, useColorScheme } from '@coldsurfers/ocean-road/native';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useCallback, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  SectionList,
  type SectionListData,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import type { LatLng } from '../../types/LatLng';
import { useLocationSelectionScreenNavigation } from './location-selection-screen.hooks';

type LocationSelectionListItemType = {
  cityId: string;
  city: string;
  latLng: LatLng;
};
type LocationSelectionListSectionType = {
  country: string;
};

type LocationSelectionListSectionData = ReadonlyArray<
  SectionListData<LocationSelectionListItemType, LocationSelectionListSectionType>
>;

const LocationSelectionScreenContent = () => {
  const { semantics } = useColorScheme();
  const navigation = useLocationSelectionScreenNavigation();
  const setUserCurrentLocation = useUserCurrentLocationStore(
    (state) => state.setUserCurrentLocation
  );
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data: locationCountries } = useSuspenseQuery({
    queryKey: apiClient.location.queryKeys.countries,
    queryFn: () => apiClient.location.getCountries(),
  });
  const sectionData = useMemo<LocationSelectionListSectionData>(() => {
    return locationCountries?.map((country) => ({
      country: country.uiName,
      data: country.cities.map((city) => {
        return {
          city: city.uiName,
          cityId: city.id,
          latLng: {
            latitude: city.lat,
            longitude: city.lng,
          },
        };
      }),
    }));
  }, [locationCountries]);

  const searchedSections = useMemo(() => {
    return sectionData
      .map((section) => {
        return {
          ...section,
          data: section.data.filter(
            (item) =>
              item.city.toLowerCase().includes(searchKeyword.toLowerCase()) ||
              section.country.toLowerCase().includes(searchKeyword.toLowerCase())
          ),
        };
      })
      .filter((section) => section !== null);
  }, [searchKeyword, sectionData]);

  const renderSectionHeader = useCallback(
    (info: {
      section: SectionListData<LocationSelectionListItemType, LocationSelectionListSectionType>;
    }) => {
      if (info.section.data.length === 0) {
        return null;
      }
      return (
        <View>
          <Text style={[styles.sectionHeader, { color: semantics.foreground[1] }]}>
            {info.section.country}
          </Text>
        </View>
      );
    },
    [semantics.foreground]
  );

  const renderItem = useCallback(
    (info: { item: LocationSelectionListItemType }) => {
      const onPress = () => {
        setUserCurrentLocation({
          ...info.item.latLng,
          cityName: info.item.city,
          type: 'city-location',
          cityId: info.item.cityId,
        });
        navigation.goBack();
      };
      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.itemText, { color: semantics.foreground[1] }]}>
            {info.item.city}
          </Text>
        </TouchableOpacity>
      );
    },
    [navigation, semantics.foreground, setUserCurrentLocation]
  );

  return (
    <CommonScreenLayout style={styles.wrapper}>
      <TextInput
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        placeholder="위치 검색 🔍"
        clearButtonMode="while-editing"
      />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SectionList
          sections={searchedSections}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          style={styles.listWrapper}
          contentContainerStyle={styles.listContainer}
        />
      </KeyboardAvoidingView>
    </CommonScreenLayout>
  );
};

export const LocationSelectionScreen = () => {
  return (
    <Suspense fallback={<Spinner positionCenter />}>
      <LocationSelectionScreenContent />
    </Suspense>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  listWrapper: { flex: 1 },
  listContainer: {
    flexGrow: 1,
    paddingTop: 24,
  },
  sectionHeader: { fontSize: 18, fontWeight: '500' },
  itemText: { fontSize: 16 },
});
