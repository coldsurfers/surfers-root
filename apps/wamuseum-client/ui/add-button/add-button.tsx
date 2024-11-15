import { Button } from '@coldsurfers/ocean-road'
import { memo } from 'react'

export const AddButton = memo(({ onPress }: { onPress: () => void }) => (
  <Button theme="white" onClick={onPress} style={{ width: 12, height: 12, marginLeft: 'auto' }}>
    ➕
  </Button>
))

AddButton.displayName = 'AddButon'
