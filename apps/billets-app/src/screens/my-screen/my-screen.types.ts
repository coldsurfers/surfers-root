import type { ZodScreenParams, zodScreen } from '@/lib';
import type { SectionListData } from 'react-native';
import type { MyStackScreenProps } from '../../navigations/my-stack-navigation/my-stack-navigation.types';

export type MyScreenParams = ZodScreenParams<typeof zodScreen.MyScreen>;
export type MyScreenProps = MyStackScreenProps<'MyScreen'>;

export type MyScreenSettingSectionListSectionT = {
  title: 'profile' | 'account' | 'saved';
  uiTitle: string;
  moreAddOn?: {
    uiText: string;
    onPress: () => void;
  };
};
export type MyScreenSettingSectionListSectionDataT = {
  title: string;
  onPress: () => void;
};
export type MyScreenSettingSectionListData = SectionListData<
  MyScreenSettingSectionListSectionDataT,
  MyScreenSettingSectionListSectionT
>;
