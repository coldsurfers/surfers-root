import { Button } from '@coldsurfers/ocean-road'
import { useCallback } from 'react'
import { StyledButtonPosition } from './firebase-notify-button.styled'

export const FirebaseNotifyButton = () => {
  const onClick = useCallback(() => {}, [])
  return (
    <StyledButtonPosition>
      <Button theme="pink" onClick={onClick} style={{ marginLeft: 10 }}>
        푸시알림 보내기
      </Button>
    </StyledButtonPosition>
  )
}
