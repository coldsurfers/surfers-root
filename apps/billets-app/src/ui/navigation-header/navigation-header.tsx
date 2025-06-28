import { IconButton, Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { MoveLeft } from 'lucide-react-native';
import { type ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NAVIGATION_HEADER_HEIGHT } from './navigation-header.constants';

export const NavigationHeader = (
  props: NativeStackHeaderProps & {
    searchBarComponent?: ReactNode;
    absolutePosition?: boolean;
  }
) => {
  const { semantics } = useColorScheme();
  const hideBackButton = useMemo(() => {
    return props.options.headerBackVisible === false;
  }, [props.options.headerBackVisible]);
  const showRightClose = useMemo(() => {
    return (
      (props.options.presentation === 'containedModal' ||
        props.options.presentation === 'containedTransparentModal' ||
        props.options.presentation === 'fullScreenModal' ||
        props.options.presentation === 'modal' ||
        props.options.presentation === 'transparentModal') &&
      !props.options.headerRight
    );
  }, [props.options.headerRight, props.options.presentation]);
  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.safeAreaView,
        {
          height: props.searchBarComponent ? 'auto' : NAVIGATION_HEADER_HEIGHT,
          backgroundColor: props.options.headerTransparent
            ? 'transparent'
            : semantics.background[3],
        },
        props.absolutePosition && styles.absolutePosition,
      ]}
    >
      <View style={styles.innerContent}>
        {!showRightClose && !hideBackButton && (
          <IconButton
            onPress={() => props.navigation.goBack()}
            theme="transparentDarkGray"
            icon="MoveLeft"
            style={[styles.rightClose]}
          >
            <MoveLeft />
          </IconButton>
        )}
        {props.options.title && (
          <View style={styles.headerTitleWrapper}>
            <Text style={[styles.headerTitle, { color: semantics.foreground[1] }]}>
              {props.options.title}
            </Text>
          </View>
        )}
        {showRightClose ? (
          <IconButton
            onPress={() => props.navigation.goBack()}
            theme="transparentDarkGray"
            icon="X"
            style={styles.absoluteRight}
          />
        ) : (
          <View style={styles.absoluteRight}>
            {props.options.headerRight?.({ canGoBack: false })}
          </View>
        )}
      </View>
      {props.searchBarComponent && props.searchBarComponent}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rightClose: {
    position: 'absolute',
    left: 12,
  },
  headerTitleWrapper: { marginLeft: 'auto', marginRight: 'auto' },
  headerTitle: { fontSize: 16 },
  absoluteRight: { position: 'absolute', right: 12 },
  safeAreaView: {
    justifyContent: 'center',
  },
  innerContent: { flexDirection: 'row', alignItems: 'center' },
  absolutePosition: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
