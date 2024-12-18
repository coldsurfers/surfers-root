import { zodNavigation } from '@/lib'
import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { House, Search, Smile } from 'lucide-react-native'
import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import palettes from '../../lib/palettes'

interface Props extends BottomTabBarProps {
  hidden?: boolean
}

export const TabBar = (props: Props) => {
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
        const renderIcon = () => {
          const strokeWidth = isFocused ? 2.5 : 1.5
          switch (route.name) {
            case zodNavigation.HomeStackNavigation.name:
              return <House color={colors.oc.white.value} strokeWidth={strokeWidth} />
            case zodNavigation.SearchStackNavigation.name:
              return <Search color={colors.oc.white.value} strokeWidth={strokeWidth} />
            case zodNavigation.MyStackNavigation.name:
              return <Smile color={colors.oc.white.value} strokeWidth={strokeWidth} />
            default:
              return null
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
            {renderIcon()}
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
    backgroundColor: colors.oc.cyan[8].value,
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    marginBottom: 4,
    fontSize: 20,
  },
  tabBarTitle: { color: colors.oc.white.value, fontWeight: '500', fontSize: 14 },
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
