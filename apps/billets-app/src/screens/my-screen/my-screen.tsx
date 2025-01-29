import { useShowBottomTabBar } from '@/lib'
import { apiClient } from '@/lib/api/openapi-client'
import { CommonScreenLayout, MyScreenLandingLayout, SubscribedConcertList, SubscribedConcertListSkeleton } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button, ProfileThumbnail, Spinner, Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import { useQuery } from '@tanstack/react-query'
import React, { Suspense, useCallback, useMemo } from 'react'
import { Pressable, SectionList, SectionListRenderItem, StyleSheet, View } from 'react-native'
import { match } from 'ts-pattern'
import { useMyScreenNavigation } from './my-screen.hooks'
import {
  MyScreenSettingSectionListData,
  MyScreenSettingSectionListSectionDataT,
  MyScreenSettingSectionListSectionT,
} from './my-screen.types'

const SuspenseMyScreen = () => {
  const navigation = useMyScreenNavigation()
  const { data: user } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  })
  const { semantics } = useColorScheme()

  useShowBottomTabBar()

  const onPressLoginButton = useCallback(() => {
    navigation.navigate('LoginStackNavigation', {
      screen: 'LoginSelectionScreen',
      params: {},
    })
  }, [navigation])
  const onPressSubscribedConcertListItem = useCallback(
    (concertId: string) => {
      navigation.navigate('ConcertStackNavigation', {
        screen: 'ConcertDetailScreen',
        params: { concertId },
      })
    },
    [navigation],
  )

  const renderSectionHeader = useCallback(
    (info: { section: MyScreenSettingSectionListSectionT }) => {
      return (
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionHeaderText, { color: semantics.foreground[1] }]}>{info.section.uiTitle}</Text>
          {info.section.moreAddOn && (
            <Pressable onPress={info.section.moreAddOn.onPress} style={styles.sectionHeaderMoreAddOnButton}>
              <Text style={[styles.sectionHeaderMoreAddOnButtonText, { color: semantics.foreground[1] }]}>
                {info.section.moreAddOn.uiText}
              </Text>
            </Pressable>
          )}
        </View>
      )
    },
    [semantics.foreground],
  )

  const renderItem: SectionListRenderItem<
    { title: string; onPress: () => void },
    {
      title: 'profile' | 'account' | 'saved'
      uiTitle: string
    }
  > = useCallback(
    (info) => {
      return match(info.section.title)
        .with('profile', () => {
          return (
            <Pressable onPress={info.item.onPress} style={styles.profileItem}>
              <ProfileThumbnail type="circle" size="md" emptyBgText={info.item.title.at(0) ?? ''} />
              <Text style={[styles.profileItemText, styles.itemText, { color: semantics.foreground[1] }]}>
                {info.item.title}
              </Text>
            </Pressable>
          )
        })
        .with('account', () => {
          return (
            <View style={{ paddingHorizontal: 16 }}>
              <Button onPress={info.item.onPress} style={styles.accountItem}>
                {info.item.title}
              </Button>
            </View>
          )
        })
        .with('saved', () => {
          return (
            <Suspense fallback={<SubscribedConcertListSkeleton />}>
              <SubscribedConcertList onPressItem={onPressSubscribedConcertListItem} />
            </Suspense>
          )
        })
        .exhaustive()
    },
    [onPressSubscribedConcertListItem, semantics.foreground],
  )

  const sections = useMemo<MyScreenSettingSectionListData[]>(() => {
    if (!user) {
      return []
    }
    return [
      {
        title: 'profile',
        uiTitle: '🙂 마이 프로필',
        data: [{ title: user.email.split('@')[0], onPress: () => {} }],
      },
      {
        title: 'saved',
        uiTitle: '❣️ 찜한 공연',
        moreAddOn: {
          uiText: '더 보기',
          onPress: () => {
            navigation.navigate('SubscribedStackNavigation', {
              screen: 'SubscribedConcertListScreen',
              params: {},
            })
          },
        },
        data: [{ title: user.email.split('@')[0], onPress: () => {} }],
      },
    ]
  }, [navigation, user])

  return user ? (
    <CommonScreenLayout>
      <SectionList<MyScreenSettingSectionListSectionDataT, MyScreenSettingSectionListSectionT>
        contentContainerStyle={[styles.sectionListContentContainer, { backgroundColor: semantics.background[3] }]}
        style={[styles.sectionList, { backgroundColor: semantics.background[3] }]}
        sections={sections}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </CommonScreenLayout>
  ) : (
    <MyScreenLandingLayout onPressLoginButton={onPressLoginButton} />
  )
}

export const MyScreen = () => {
  return (
    <Suspense fallback={<Spinner positionCenter />}>
      <SuspenseMyScreen />
    </Suspense>
  )
}

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
  itemText: { fontWeight: '700', fontSize: 18 },
  sectionList: {},
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    marginLeft: 8,
  },
  accountItem: {
    backgroundColor: colors.oc.gray[6].value,
  },
  profileItemThumbnailText: {
    fontSize: 18,
    color: colors.oc.white.value,
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderMoreAddOnButton: {
    marginLeft: 'auto',
  },
  sectionHeaderMoreAddOnButtonText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  deactivateUserWrapper: {
    marginLeft: 'auto',
  },
})
