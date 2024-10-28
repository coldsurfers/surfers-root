import { Text } from '@coldsurfers/hotsurf'
import { PropsWithChildren, memo } from 'react'

const Label = memo(({ children }: PropsWithChildren<{}>) => (
  <Text style={{ marginBottom: 10, fontSize: 16 }}>{children}</Text>
))

Label.displayName = 'Label'

export default Label
