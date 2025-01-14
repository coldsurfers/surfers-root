import { Button, Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import { memo } from 'react'
import { StyledErrorContainer } from './unknown-error.styled'

export const UnknownError = memo(({ onPressRetry }: { onPressRetry: () => void }) => {
  const { semantics } = useColorScheme()
  return (
    <StyledErrorContainer style={{ backgroundColor: semantics.background[3] }}>
      <Text weight="bold" style={{ marginBottom: 16, fontSize: 20, color: semantics.foreground[1] }}>
        알 수 없는 오류가 발생했어요 🗯
      </Text>
      <Button onPress={onPressRetry}>다시 시도하기</Button>
    </StyledErrorContainer>
  )
})
