import { Paragraph } from '@/ui/paragraph'
import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledPostItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${media.medium(css`
    flex-direction: column;
    align-items: flex-start;

    margin-bottom: 2rem;
  `)}
`

export const StyledPostSubContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media.medium(css`
    margin-left: auto;
    margin-top: 1rem;
  `)}
`

export const StyledPostItemDateLocale = styled(Paragraph)`
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

export const StyledPostItemTitleText = styled(Paragraph)`
  font-size: 18px;
  font-weight: 500;

  margin: unset;

  ${media.medium(css`
    font-size: 16px;
  `)}
`

export const StyledPostItemWriterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`

export const StyledPostItemWriterText = styled(Paragraph)`
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
