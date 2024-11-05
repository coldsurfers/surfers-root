import { Paragraph } from '@/ui/paragraph'
import { Link } from 'i18n/routing'
import styled from 'styled-components'
import nativeStyled from 'styled-components/native'

export const StyledPostItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const StyledPostItemDateLocale = nativeStyled(Paragraph)`
  opacity: 0.65;
`

export const StyledPostItemPostTitleLink = styled(Link)`
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
`

export const StyledPostItemWriterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`

export const StyledPostItemWriterText = nativeStyled(Paragraph)``
export const StyledPostItemWriterAvatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
`
