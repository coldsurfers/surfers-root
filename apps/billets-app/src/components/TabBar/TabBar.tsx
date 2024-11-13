import { palette, Text } from 'fstvllife-design-system'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'
import { StackScreens } from '../../lib/navigations'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import palettes from '../../lib/palettes'

interface Props extends BottomTabBarProps {
  hidden?: boolean
}

const TabBar = (props: Props) => {
  const { navigation, state, descriptors, hidden } = props
  const hiddenAnimationValue = useRef(new Animated.Value(0)).current
  const { bottom: bottomInset } = useSafeAreaInsets()

  useEffect(() => {
    Animated.timing(hiddenAnimationValue, {
      duration: 300,
      toValue: hidden ? 75 : 0,
      useNativeDriver: false,
    }).start()
  }, [hidden, hiddenAnimationValue])

  return (
    <Animated.View
      style={[
        styles.tabBar,
        styles.shadowBox,
        {
          paddingBottom: bottomInset,
        },
        {
          transform: [
            {
              translateY: hiddenAnimationValue,
            },
          ],
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name
        const emoji = () => {
          switch (route.name) {
            case StackScreens.HomeStackScreen:
              return '🏠'
            case StackScreens.SearchStackScreen:
              return '🔎'
            case StackScreens.ConcertStackScreen:
              return '📰'
            case StackScreens.FundingStackScreen:
              return '💰'
            case StackScreens.ContentsStackScreen:
              return '🗞'
            case StackScreens.CommunityStackScreen:
              return '🎙'
            case StackScreens.MyStackScreen:
              return '🙂'
            case StackScreens.CalendarStackScreen:
              return '🗓'
            case StackScreens.ConcertSearchStackScreen:
              return '🔎'
          }
        }

        const handlePress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={route.name}
            onPress={handlePress}
            onLongPress={onLongPress}
            style={styles.tabBarButton}
          >
            <Text style={styles.emoji}>{emoji()}</Text>
            <Text style={[styles.tabBarTitle, isFocused && styles.tabBarTitleFocused]}>
              {typeof label === 'string' && label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#6F8EA3',
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    marginBottom: 4,
  },
  tabBarTitle: { color: palette.white, fontWeight: '500' },
  tabBarTitleFocused: {
    fontWeight: '800',
  },
  shadowBox: {
    // iOS Shadow Properties
    shadowColor: palettes.black, // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // How blurry the shadow is

    // Android Shadow Property
    elevation: 5, // Elevation for Android
  },
})

export default TabBar
