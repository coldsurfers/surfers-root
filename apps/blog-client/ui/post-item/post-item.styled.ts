import { media, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledPostItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const StyledPostSubContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 12rem;

  ${media.medium(css`
    margin-left: auto;
    width: 10rem;
  `)}
`

export const StyledPostItemDateLocale = styled(Text)`
  opacity: 0.65;
  margin: unset;
  ${media.medium(css`
    font-size: 14px;
  `)}
`

export const StyledPostItemPostTitleContainer = styled.div`
  flex: 1;
  margin: 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-right: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  a {
    color: inherit;
  }

  ${media.medium(css`
    margin-right: unset;
    width: 100%;
  `)}
`

export const StyledPostItemTitleText = styled(Text)`
  font-size: 18px;
  font-weight: 500;

  margin: unset;

  ${media.medium(css`
    font-size: 16px;
    margin-right: 16px;
  `)}
`

export const StyledPostItemWriterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`

export const StyledPostItemWriterText = styled(Text)`
  margin: unset;
  ${media.medium(css`
    font-size: 14px;
  `)}
`
export const StyledPostItemWriterAvatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
`
