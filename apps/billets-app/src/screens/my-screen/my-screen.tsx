import { SubscribedConcertList } from '@/features'
import { Screens } from '@/lib'
import { CommonScreenLayout } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button, ProfileThumbnail, Spinner, Text } from '@coldsurfers/ocean-road/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Alert, Pressable, SectionList, SectionListRenderItem, StyleSheet, View } from 'react-native'
import { match } from 'ts-pattern'
import { AuthContext } from '../../lib/contexts/auth-context/auth-context'
import palettes from '../../lib/palettes'
import { useMyScreenNavigation } from './my-screen.hooks'
import { MyScreenSettingSectionListData, MyScreenSettingSectionListSectionT } from './my-screen.types'

const ListHeaderComponent = () => {
  return (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>프로필</Text>
    </View>
  )
}

export const MyScreen = () => {
  const navigation = useMyScreenNavigation()
  const { user, logout, isLoading } = useContext(AuthContext)
  const [settingSections, setSettingSections] = useState<Array<MyScreenSettingSectionListData>>([])
  const onPressLoginButton = useCallback(() => {
    navigation.navigate('LoginStackScreen', {
      screen: 'LoginSelectionScreen',
      params: {},
    })
  }, [navigation])
  const onPressSubscribedConcertListItem = useCallback(
    (concertId: string) => {
      navigation.navigate('ConcertStackScreen', {
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
              <ProfileThumbnail size="md" emptyBgText={info.item.title.at(0) ?? ''} />
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

  useEffect(() => {
    if (!user) {
      return
    }

    setSettingSections([
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
            navigation.navigate('SubscribedStackScreen', {
              screen: Screens.SubscribedConcertListScreen,
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
                    navigation.navigate('HomeStackScreen', {
                      screen: 'HomeScreen',
                      params: {},
                    })
                    setSettingSections([])
                  },
                },
              ])
            },
          },
        ],
      },
    ])
  }, [logout, navigation, user])

  if (isLoading) {
    return (
      <View style={styles.wrapper}>
        <Spinner />
      </View>
    )
  }

  return user ? (
    <CommonScreenLayout>
      <SectionList
        contentContainerStyle={styles.sectionListContentContainer}
        style={styles.sectionList}
        sections={settingSections}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={ListHeaderComponent}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </CommonScreenLayout>
  ) : (
    <CommonScreenLayout style={styles.wrapper}>
      <Text weight="bold" style={styles.loginText}>
        {`🎉\n예정된 많은\n공연을\n놓치지 마세요`}
      </Text>
      <Text style={styles.loginSubText}>{`로그인 후 찜하기를 사용해보세요`}</Text>
      <Button style={styles.loginButton} onPress={onPressLoginButton}>
        로그인 / 회원가입
      </Button>
    </CommonScreenLayout>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.oc.gray[1].value,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonTitle: {
    color: colors.oc.white.value,
    fontWeight: '700',
    fontSize: 14,
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
  loginButton: {
    backgroundColor: palettes.lightblue[500],
    marginTop: 16,
  },
  loginText: { fontSize: 24, textAlign: 'center' },
  loginSubText: {
    fontSize: 16,
    textAlign: 'center',
    color: palettes.gray[500],
    marginTop: 8,
  },
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
})
