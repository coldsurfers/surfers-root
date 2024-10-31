'use client'

import { View } from 'react-native'

const TEXT = 'ColdSurfers | Home'

export function Header() {
  return (
    <View style={{ paddingTop: 20, paddingBottom: 20 }}>
      <View>
        <div style={{ fontWeight: 'bold', fontSize: 32 }}>{TEXT}</div>
      </View>
    </View>
  )
}
