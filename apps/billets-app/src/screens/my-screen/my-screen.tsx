import { useMeQuery } from '@/features/auth/hooks/useMeQuery';
import { useShowBottomTabBar } from '@/lib';
import {
  CommonScreenLayout,
  MyScreenLoginForm,
  SubscribeInfoMe,
  SubscribedConcertListSkeleton,
} from '@/ui';
import { GlobalSuspenseFallback } from '@/ui/global-suspense-fallback';
import { colors } from '@coldsurfers/ocean-road';
import { Button, Spinner, Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import { ChevronRight } from 'lucide-react-native';
import React, { Suspense, useCallback, useMemo } from 'react';
import { Pressable, SectionList, type SectionListRenderItem, StyleSheet, View } from 'react-native';
import { match } from 'ts-pattern';
import { useMyScreenNavigation } from './my-screen.hooks';
import type {
  MyScreenSettingSectionListData,
  MyScreenSettingSectionListSectionDataT,
  MyScreenSettingSectionListSectionT,
} from './my-screen.types';

const SuspenseMyScreen = () => {
  const navigation = useMyScreenNavigation();
  const { data: user, isLoading, error: meError } = useMeQuery();

  const { semantics } = useColorScheme();

  useShowBottomTabBar();

  const renderSectionHeader = useCallback(
    (info: { section: MyScreenSettingSectionListSectionT }) => {
      return (
        <View style={styles.sectionHeader}>
          <View style={{ marginRight: 4 }}>
            {match(info.section.title)
              .with('profile', () => {
                return null;
              })
              .with('saved', () => {
                return null;
              })
              .otherwise(() => null)}
          </View>
          <Text style={[styles.sectionHeaderText, { color: semantics.foreground[3] }]}>
            {info.section.uiTitle}
          </Text>
          {info.section.moreAddOn && (
            <Pressable
              onPress={info.section.moreAddOn.onPress}
              style={styles.sectionHeaderMoreAddOnButton}
              hitSlop={20}
            >
              <Text
                style={[
                  styles.sectionHeaderMoreAddOnButtonText,
                  { color: semantics.foreground[1] },
                ]}
              >
                {info.section.moreAddOn.uiText}
              </Text>
              <ChevronRight color={semantics.foreground[1]} strokeWidth={2.5} size={16} />
            </Pressable>
          )}
        </View>
      );
    },
    [semantics.foreground]
  );

  const renderItem: SectionListRenderItem<
    { title: string; onPress: () => void },
    {
      title: 'profile' | 'account' | 'saved';
      uiTitle: string;
    }
  > = useCallback(
    (info) => {
      return match(info.section.title)
        .with('profile', () => {
          return (
            <Pressable onPress={info.item.onPress} style={styles.profileItem}>
              <Text
                style={[
                  styles.profileItemText,
                  styles.itemText,
                  { color: semantics.foreground[1] },
                ]}
              >
                {info.item.title}
              </Text>
            </Pressable>
          );
        })
        .with('account', () => {
          return (
            <View style={{ paddingHorizontal: 16 }}>
              <Button onPress={info.item.onPress} style={styles.accountItem}>
                {info.item.title}
              </Button>
            </View>
          );
        })
        .with('saved', () => {
          return (
            <Suspense fallback={<SubscribedConcertListSkeleton />}>
              <SubscribeInfoMe />
            </Suspense>
          );
        })
        .exhaustive();
    },
    [semantics.foreground]
  );

  const sections = useMemo<MyScreenSettingSectionListData[]>(() => {
    if (!user) {
      return [];
    }
    return [
      {
        title: 'profile',
        uiTitle: '문화창꼬',
        data: [{ title: user.handle ?? '', onPress: () => {} }],
      },
      {
        title: 'saved',
        uiTitle: '창꼬에 담은 공연',
        data: [{ title: user.email.split('@')[0], onPress: () => {} }],
        moreAddOn: {
          uiText: '더보기',
          onPress: () => {
            navigation.navigate('SubscribedStackNavigation', {
              screen: 'SubscribedConcertListScreen',
              params: {},
            });
          },
        },
      },
    ];
  }, [user, navigation]);

  if (isLoading && !meError) {
    return <GlobalSuspenseFallback />;
  }

  return user ? (
    <CommonScreenLayout>
      <SectionList<MyScreenSettingSectionListSectionDataT, MyScreenSettingSectionListSectionT>
        contentContainerStyle={[
          styles.sectionListContentContainer,
          { backgroundColor: semantics.background[3] },
        ]}
        style={[styles.sectionList, { backgroundColor: semantics.background[3] }]}
        sections={sections}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </CommonScreenLayout>
  ) : (
    <MyScreenLoginForm />
  );
};

export const MyScreen = () => {
  return (
    <Suspense fallback={<Spinner positionCenter />}>
      <SuspenseMyScreen />
    </Suspense>
  );
};

const styles = StyleSheet.create({
  sectionListContentContainer: {
    flexGrow: 1,
  },
  listHeader: {
    alignItems: 'center',
  },
  listHeaderText: { fontSize: 16 },
  sectionHeaderText: { fontSize: 16, fontWeight: '500' },
  item: {
    paddingVertical: 4,
  },
  itemText: { fontWeight: '700', fontSize: 24 },
  sectionList: {},
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  profileItemTextWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.oc.gray[3].value,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileItemText: {
    paddingVertical: 4,
  },
  accountItem: {
    backgroundColor: colors.oc.gray[6].value,
  },
  profileItemThumbnailText: {
    fontSize: 18,
    color: colors.oc.white.value,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderMoreAddOnButton: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderMoreAddOnButtonText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  deactivateUserWrapper: {
    marginLeft: 'auto',
  },
});
