// @ts-nocheck

'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { PropsWithChildren } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { StyleSheet } from 'react-native'

export default function StyleSheetRegistry({ children }: PropsWithChildren) {
  useServerInsertedHTML(() => {
    const sheet = StyleSheet.getSheet()
    return <style dangerouslySetInnerHTML={{ __html: sheet.textContent }} id={sheet.id} />
  })
  return <>{children}</>
}
