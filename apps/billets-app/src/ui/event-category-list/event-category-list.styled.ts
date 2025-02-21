import { Text } from '@coldsurfers/ocean-road/native'
import styled from '@emotion/native'
import { Disc3, MicVocal, VenetianMask } from 'lucide-react-native'

export const StyledEventCategoryButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding-vertical: 12px;
  padding-horizontal: 12px;
  margin-right: 8px;
`
export const StyledEventCategoryButtonText = styled(Text)`
  margin-left: 4px;
  font-size: 12px;
`

export const MicVocalIcon = styled(MicVocal)``

export const TheatreIcon = styled(VenetianMask)``

export const DanceIcon = styled(Disc3)``
