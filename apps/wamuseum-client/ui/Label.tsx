import { Text } from '@coldsurfers/ocean-road';
import { type PropsWithChildren, memo } from 'react';

const Label = memo(({ children }: PropsWithChildren) => (
  <Text style={{ marginBottom: 10, fontSize: 16 }}>{children}</Text>
));

Label.displayName = 'Label';

export default Label;
