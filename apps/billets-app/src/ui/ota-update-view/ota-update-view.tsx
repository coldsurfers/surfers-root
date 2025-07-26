import { colors } from '@coldsurfers/ocean-road';
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native';
import FastImage from '@d11/react-native-fast-image';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CommonScreenLayout } from '../common-screen-layout';

export const OtaUpdateView = ({
  updateProgressPercentage,
}: { updateProgressPercentage: number }) => {
  const { semantics } = useColorScheme();
  return (
    <SafeAreaProvider>
      <CommonScreenLayout
        style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 48 }}
      >
        <FastImage
          source={require('assets/bootsplash/logo.png')}
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
          }}
        />
        <View
          style={{ marginTop: 36, width: '100%', alignItems: 'center', justifyContent: 'center' }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: colors.oc.white.value,
              height: 8,
              borderRadius: 12,
            }}
          >
            <View
              style={{
                width: `${updateProgressPercentage}%`,
                backgroundColor: colors.oc.indigo[8].value,
                height: '100%',
                borderRadius: 8,
              }}
            />
          </View>
          <View style={{ marginTop: 24 }}>
            <Text
              weight="medium"
              style={{
                fontSize: 14,
                color: semantics.foreground[1],
                textAlign: 'center',
                lineHeight: 24,
              }}
            >
              {`업데이트를 설치하고 있어요\n${updateProgressPercentage}%`}
            </Text>
          </View>
        </View>
      </CommonScreenLayout>
    </SafeAreaProvider>
  );
};
