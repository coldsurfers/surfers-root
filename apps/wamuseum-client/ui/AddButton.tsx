import { Button } from '@coldsurfers/ocean-road'
import { memo } from 'react'

const AddButton = memo(({ onPress }: { onPress: () => void }) => (
  <Button color="white" onClick={onPress} style={{ width: 12, height: 12, marginLeft: 'auto' }}>
    ➕
  </Button>
))

AddButton.displayName = 'AddButon'

export default AddButton
