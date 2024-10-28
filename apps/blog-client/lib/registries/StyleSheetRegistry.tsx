'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'

export default function StyleSheetRegistry({ children }: PropsWithChildren) {
  useServerInsertedHTML(() => {
    // @ts-ignore
    const sheet = StyleSheet.getSheet()
    return (
      <style
        dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        id={sheet.id}
      />
    )
  })
  return <>{children}</>
}
