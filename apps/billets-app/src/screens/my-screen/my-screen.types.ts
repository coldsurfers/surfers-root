import { SectionListData } from 'react-native'
import { MyStackProp } from '../../navigations/my-stack-navigation/my-stack-navigation.types'

export type MyScreenParam = {
  //
}
export type MyScreenProp = MyStackProp<'MyScreen'>

export type MyScreenSettingSectionListSectionT = {
  title: 'profile' | 'account' | 'saved'
  uiTitle: string
  moreAddOn?: {
    uiText: string
    onPress: () => void
  }
}
export type MyScreenSettingSectionListData = SectionListData<
  {
    title: string
    onPress: () => void
  },
  MyScreenSettingSectionListSectionT
>
