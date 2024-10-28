import { Button } from '@coldsurfers/hotsurf'
import { memo } from 'react'

const AddButton = memo(({ onPress }: { onPress: () => void }) => (
  <Button
    text={'➕'}
    color="white"
    onPress={onPress}
    style={{ width: 12, height: 12, marginLeft: 'auto' }}
  />
))

AddButton.displayName = 'AddButon'

export default AddButton
