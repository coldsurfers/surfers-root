import { useBottomTab } from '@/lib';
import { colors } from '@coldsurfers/ocean-road';
import { Spinner, useColorScheme } from '@coldsurfers/ocean-road/native';
import { type PropsWithChildren, Suspense } from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import { type Edges, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export const CommonScreenLayout = ({
  children,
  style,
  edges = [],
  withBottomTab = true,
}: PropsWithChildren<{
  edges?: Edges;
  style?: StyleProp<ViewStyle>;
  withBottomTab?: boolean;
}>) => {
  const { semantics } = useColorScheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { tabBarHeight } = useBottomTab();
  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.layout,
        {
          backgroundColor: semantics.background[3],
        },
        style,
        {
          /**
           * because we set bottom tab bar as position absolute, so we need to calculate individual bottom inset
           */
          paddingBottom: withBottomTab ? tabBarHeight - bottomInset : 0,
        },
      ]}
    >
      <Suspense fallback={<Spinner positionCenter />}>{children}</Suspense>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.oc.gray[1].value,
  },
});
