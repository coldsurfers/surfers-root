import { TabBar } from '@/ui';
import { type BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { HomeStackNavigation } from '../home-stack-navigation';
import { MyStackNavigation } from '../my-stack-navigation';
import SearchStackNavigation from '../search-stack-navigation/search-stack-navigation';
import type { MainTabParamList } from './main-tab-navigation.types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

export const MainTabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        lazy: false,
      }}
    >
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
          tabBarLabel: '나의 창꼬',
        }}
        name="MyStackNavigation"
        component={MyStackNavigation}
      />
    </Tab.Navigator>
  );
};
