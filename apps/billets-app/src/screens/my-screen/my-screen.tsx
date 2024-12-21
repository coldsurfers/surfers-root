import { SubscribedConcertList } from '@/features'
import { $api } from '@/lib/api/openapi-client'
import useGetMeQuery from '@/lib/react-query/queries/useGetMeQuery'
import { CommonScreenLayout, MyScreenLandingLayout } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button, ProfileThumbnail, Spinner, Text } from '@coldsurfers/ocean-road/native'
import React, { Suspense, useCallback, useContext, useMemo } from 'react'
import { Alert, Pressable, SectionList, SectionListRenderItem, StyleSheet, View } from 'react-native'
import { match } from 'ts-pattern'
import { AuthContext } from '../../lib/contexts/auth-context/auth-context'
import { useMyScreenNavigation } from './my-screen.hooks'
import {
  MyScreenSettingSectionListData,
  MyScreenSettingSectionListSectionDataT,
  MyScreenSettingSectionListSectionT,
} from './my-screen.types'

const ListFooterComponent = () => {
  const { logout } = useContext(AuthContext)
  const { mutate: deactivateUser } = $api.useMutation('delete', '/v1/user/deactivate', {
    onSuccess: () => logout(),
  })
  const onPress = useCallback(() => {
    Alert.alert('회원탈퇴', '회원탈퇴를 하면 더 이상 해당 계정으로 로그인 할 수 없어요', [
      {
        style: 'destructive',
        text: '탈퇴하기',
        onPress: () =>
          deactivateUser({
            body: {
              type: 'deactivate',
            },
          }),
      },
      {
        style: 'cancel',
        text: '취소',
      },
    ])
  }, [deactivateUser])
  return (
    <View style={styles.deactivateUserWrapper}>
      <Button
        theme="transparent"
        hitSlop={{
          top: 20,
          bottom: 20,
          left: 20,
          right: 20,
        }}
        onPress={onPress}
      >
        회원탈퇴
      </Button>
    </View>
  )
}

const SuspenseMyScreen = () => {
  const navigation = useMyScreenNavigation()
  const { logout } = useContext(AuthContext)
  const { data: user } = useGetMeQuery()
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

  const renderSectionHeader = useCallback((info: { section: MyScreenSettingSectionListSectionT }) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{info.section.uiTitle}</Text>
        {info.section.moreAddOn && (
          <Pressable onPress={info.section.moreAddOn.onPress} style={styles.sectionHeaderMoreAddOnButton}>
            <Text style={styles.sectionHeaderMoreAddOnButtonText}>{info.section.moreAddOn.uiText}</Text>
          </Pressable>
        )}
      </View>
    )
  }, [])

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
              <Text style={[styles.profileItemText, styles.itemText]}>{info.item.title}</Text>
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
          return <SubscribedConcertList onPressItem={onPressSubscribedConcertListItem} />
        })
        .exhaustive()
    },
    [onPressSubscribedConcertListItem],
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
      {
        title: 'account',
        uiTitle: '🔧 계정설정',
        data: [
          {
            title: '로그아웃',
            onPress: async () => {
              Alert.alert('로그아웃', '로그아웃 하시겠어요?', [
                {
                  text: '취소',
                  style: 'cancel',
                },
                {
                  text: '로그아웃',
                  onPress: async () => {
                    await logout()
                    navigation.navigate('HomeStackNavigation', {
                      screen: 'HomeScreen',
                      params: {},
                    })
                  },
                },
              ])
            },
          },
        ],
      },
    ]
  }, [logout, navigation, user])

  return user ? (
    <CommonScreenLayout>
      <SectionList<MyScreenSettingSectionListSectionDataT, MyScreenSettingSectionListSectionT>
        contentContainerStyle={styles.sectionListContentContainer}
        style={styles.sectionList}
        sections={sections}
        stickySectionHeadersEnabled={false}
        ListFooterComponent={ListFooterComponent}
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
  wrapper: {
    flex: 1,
    backgroundColor: colors.oc.gray[1].value,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionListContentContainer: {
    backgroundColor: colors.oc.gray[1].value,
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
  sectionList: { backgroundColor: colors.oc.gray[1].value },
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
