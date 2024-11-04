import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { TabBar } from '../components/TabBar'
import { StackScreens } from '../lib/navigations'
import HomeStackNavigation from './HomeStackNavigation'
import { MainTabNavigationParamList } from './MainTabNavigation.types'
import MyStackNavigation from './MyStackNavigation'
import SearchStackNavigation from './SearchStackNavigation'

const Tab = createBottomTabNavigator<MainTabNavigationParamList>()

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />

const MainTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={renderTabBar}>
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: '홈',
        }}
        name={StackScreens.HomeStackScreen}
        component={HomeStackNavigation}
      />
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: '검색',
        }}
        name={StackScreens.SearchStackScreen}
        component={SearchStackNavigation}
      />
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: 'MY',
        }}
        name={StackScreens.MyStackScreen}
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

export default MainTabNavigation
