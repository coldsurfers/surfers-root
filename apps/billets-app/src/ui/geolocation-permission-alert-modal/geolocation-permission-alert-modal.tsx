import { useColorScheme } from '@coldsurfers/ocean-road/native'
import { Linking } from 'react-native'
import { StyledButton, StyledModal, StyledModalInner, StyledText } from './geolocation-permission-alert-modal.styled'

interface GeolocationPermissionAlertModalProps {
  visible: boolean
  closeModal: () => void
}

export const GeolocationPermissionAlertModal = ({ visible, closeModal }: GeolocationPermissionAlertModalProps) => {
  const { semantics } = useColorScheme()
  return (
    <StyledModal visible={visible} onPressBackground={closeModal}>
      <StyledModalInner style={{ backgroundColor: semantics.background[4] }}>
        <StyledText weight="bold" style={{ color: semantics.foreground[1], fontSize: 16 }}>
          앗, 위치 권한이 필요해요!
        </StyledText>
        <StyledText style={{ color: semantics.foreground[1], marginTop: 8 }}>
          내 주변의 더 정확한 이벤트들을 찾기 위해 위치 권한을 허용해주세요
        </StyledText>
        <StyledButton
          onPress={() => {
            closeModal()
            Linking.openSettings()
          }}
        >
          위치 권한 설정하기
        </StyledButton>
      </StyledModalInner>
    </StyledModal>
  )
}
