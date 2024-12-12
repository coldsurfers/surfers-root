import { TabBar } from '@/ui'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { HomeStackNavigation } from '../home-stack-navigation'
import { MyStackNavigation } from '../my-stack-navigation'
import SearchStackNavigation from '../search-stack-navigation/search-stack-navigation'
import { MainTabParamList } from './main-tab-navigation.types'

const Tab = createBottomTabNavigator<MainTabParamList>()

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />

export const MainTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={renderTabBar}>
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: '홈',
        }}
        name="HomeStackNavigation"
        component={HomeStackNavigation}
      />
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: '검색',
        }}
        name="SearchStackNavigation"
        component={SearchStackNavigation}
      />
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: 'MY',
        }}
        name="MyStackNavigation"
        component={MyStackNavigation}
      />
      {/* <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: '공연정보',
        }}
        name={StackScreens.ConcertStackScreen}
        component={ConcertStackNavigation}
      /> */}
      {/* <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: '캘린더',
        }}
        name={StackScreens.CalendarStackScreen}
        component={CalendarStackNavigation}
      /> */}
      {/* <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: '공연 검색',
        }}
        name={StackScreens.ConcertSearchStackScreen}
        component={ConcertSearchStackNavigation}
      /> */}
      {/* <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: '펀딩',
        }}
        name={StackScreens.FundingStackScreen}
        component={FundingNavigation}
      />
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: '컨텐츠',
        }}
        name={StackScreens.ContentsStackScreen}
        component={ContentsNavigation}
      />
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: '커뮤니티',
        }}
        name={StackScreens.CommunityStackScreen}
        component={CommunityNavigation}
      /> */}
      {/* <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: '커뮤니티',
        }}
        name={StackScreens.CommunityStackScreen}
        component={CommunityNavigation}
      /> */}
    </Tab.Navigator>
  )
}
