import styled from 'styled-components'
import { PropsWithChildren } from 'react'

const Wrapper = styled.div<{ $fade: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  background: ${(p) => (p.$fade ? 'linear-gradient(0deg, #18181f, hsla(0, 50%, 50%, 0))' : 'none')};
  z-index: 99;
  padding-bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;
`

export function BottomSticky({
  children,
  withFade,
}: PropsWithChildren<{
  withFade?: boolean
}>) {
  return <Wrapper $fade={!!withFade}>{children}</Wrapper>
}
