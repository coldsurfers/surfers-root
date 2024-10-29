import {palette} from 'fstvllife-design-system';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Screens} from '../lib/navigations';
import {MyStackProp} from '../navigations/MyStackNavigation.types';

export type ArtistAddScreenParam = {
  [Screens.ArtistAddScreen]: {};
};

export type ArtistAddScreenProp = MyStackProp<'ArtistAddScreen'>;

const ArtistAddScreen = () => {
  return <SafeAreaView style={styles.wrapper} />;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: palette.white,
  },
});

export default ArtistAddScreen;
