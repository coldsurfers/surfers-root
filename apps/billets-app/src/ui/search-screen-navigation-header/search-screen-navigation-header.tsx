import { withHapticPress } from '@/lib';
import { colors } from '@coldsurfers/ocean-road';
import { Button, Text, TextInput, useColorScheme } from '@coldsurfers/ocean-road/native';
import { X as XIcon } from 'lucide-react-native';
import { memo, useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useShallow } from 'zustand/shallow';
import { getSearchFilterUIValue } from '../../features/search/store';
import { useSearchStore } from '../../features/search/store/search-store';
import { FULLY_EXPANDED_SNAP_INDEX } from '../../features/search/store/search-store.constants';
import { NAVIGATION_HEADER_HEIGHT } from '../navigation-header';
import { SEARCH_DIM_HEIGHT_FLAG } from '../search.ui.constants';

export const SearchScreenNavigationHeader = memo(
  ({ animatedPosition }: { animatedPosition: SharedValue<number> }) => {
    const { semantics } = useColorScheme();
    const { top: topInset } = useSafeAreaInsets();
    const [placeholder, setPlaceholder] = useState('🔎 어떤 공연을 찾고 싶으세요?');
    const { keyword, setKeyword } = useSearchStore(
      useShallow((state) => ({
        keyword: state.keyword,
        setKeyword: state.setKeyword,
      }))
    );
    const { selectedLocationFilter, setSelectedLocationFilter } = useSearchStore(
      useShallow((state) => ({
        selectedLocationFilter: state.selectedLocationFilter,
        setSelectedLocationFilter: state.setSelectedLocationFilter,
      }))
    );
    const { setSnapIndex, setViewMode } = useSearchStore(
      useShallow((state) => ({
        setSnapIndex: state.setSnapIndex,
        setViewMode: state.setViewMode,
      }))
    );
    const { setLocationConcerts } = useSearchStore(
      useShallow((state) => ({
        setLocationConcerts: state.setLocationConcerts,
      }))
    );

    const initializeState = useCallback(() => {
      setSelectedLocationFilter(null);
      setSnapIndex(FULLY_EXPANDED_SNAP_INDEX);
      setViewMode('list');
      setLocationConcerts([]);
    }, [setLocationConcerts, setSelectedLocationFilter, setSnapIndex, setViewMode]);

    const onPressFilterXIcon = useCallback(() => {
      initializeState();
    }, [initializeState]);
    const onChangeText = useCallback(
      (text: string) => {
        setKeyword(text);
        initializeState();
      },
      [initializeState, setKeyword]
    );

    const animatedHeaderStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        animatedPosition.value,
        [0, SEARCH_DIM_HEIGHT_FLAG],
        /**
         * oc gray 1
         */
        [semantics.background[3], 'rgba(0, 0, 0, 0)'] // From original color to dimmed black overlay
      );

      return {
        backgroundColor,
      };
    });

    return (
      <Animated.View
        style={[
          {
            height: NAVIGATION_HEADER_HEIGHT + topInset,
            position: 'absolute',
            paddingTop: topInset + 10,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 99,
          },
          animatedHeaderStyle,
        ]}
      >
        <TextInput
          value={keyword}
          onChangeText={onChangeText}
          onFocus={() => setPlaceholder('')}
          onBlur={() => setPlaceholder('🔎 어떤 공연을 찾고 싶으세요?')}
          autoCapitalize="none"
          placeholder={placeholder}
          clearButtonMode="while-editing"
          style={{
            marginHorizontal: 14,
            fontSize: 14,
          }}
        />
        <View style={styles.filters}>
          {selectedLocationFilter !== null && (
            <Button size="sm" theme="border" style={styles.filterBtn}>
              <Text style={styles.filterText}>
                {getSearchFilterUIValue(selectedLocationFilter)}
              </Text>
              {selectedLocationFilter !== 'current-location' && (
                <Pressable
                  hitSlop={{
                    top: 8,
                    left: 8,
                    right: 8,
                    bottom: 8,
                  }}
                  onPress={withHapticPress(onPressFilterXIcon)}
                  style={styles.filterXIconBtn}
                >
                  <XIcon size={14} color={colors.oc.black.value} strokeWidth={3} />
                </Pressable>
              )}
            </Button>
          )}
        </View>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  topInputWrapper: {
    paddingTop: 14,
    paddingBottom: 8,
    paddingHorizontal: 14,
  },
  filters: {
    marginTop: 14,
    marginHorizontal: 14,
  },
  filterText: { fontSize: 12 },
  filterXIconBtn: { marginLeft: 4 },
  filterBtn: {
    alignSelf: 'baseline',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
