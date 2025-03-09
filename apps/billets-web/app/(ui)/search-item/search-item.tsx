'use client'

import { paths } from '@coldsurfers/api-sdk'
import { format } from 'date-fns'
import { match } from 'ts-pattern'
import { SEARCH_ITEM_ARTIST_THUMBNAIL_SIZE } from './search-item.constants'
import {
  SearchItemEventThumbnailSquare,
  SearchItemThumbnailCircle,
  StyledSearchItemLink,
  StyledSearchItemMainText,
  StyledSearchItemRightInfoWrapper,
  StyledSearchItemSubText,
} from './search-item.styled'

type SearchItemProps = paths['/v1/search/']['get']['responses']['200']['content']['application/json'][number] & {
  onClick: () => void
}

export const SearchItem = (item: SearchItemProps) => {
  return match(item)
    .when(
      (value) => value.type === 'artist',
      (value) => {
        return (
          <StyledSearchItemLink key={value.id} href={`/artist/${value.id}`} onClick={item.onClick}>
            <SearchItemThumbnailCircle
              src={`${value.profileImgUrl}&width=${SEARCH_ITEM_ARTIST_THUMBNAIL_SIZE}&height=${SEARCH_ITEM_ARTIST_THUMBNAIL_SIZE}`}
            />
            <StyledSearchItemRightInfoWrapper>
              <StyledSearchItemMainText as="p" numberOfLines={1}>
                {value.name}
              </StyledSearchItemMainText>
              <StyledSearchItemSubText as="p" numberOfLines={1}>
                아티스트
              </StyledSearchItemSubText>
            </StyledSearchItemRightInfoWrapper>
          </StyledSearchItemLink>
        )
      },
    )
    .when(
      (value) => value.type === 'concert',
      (value) => {
        return (
          <StyledSearchItemLink key={value.id} href={`/event/${value.id}`} onClick={item.onClick}>
            <SearchItemEventThumbnailSquare
              src={`${value.thumbnailImgUrl}&width=${SEARCH_ITEM_ARTIST_THUMBNAIL_SIZE}&height=${SEARCH_ITEM_ARTIST_THUMBNAIL_SIZE}`}
            />
            <StyledSearchItemRightInfoWrapper>
              <StyledSearchItemMainText as="p" numberOfLines={1}>
                {value.title}
              </StyledSearchItemMainText>
              <StyledSearchItemSubText as="p" numberOfLines={1}>
                {format(new Date(value.date), 'EEE, MMM dd')}
              </StyledSearchItemSubText>
              <StyledSearchItemSubText as="p" numberOfLines={1}>
                {value.venueTitle}
              </StyledSearchItemSubText>
            </StyledSearchItemRightInfoWrapper>
          </StyledSearchItemLink>
        )
      },
    )
    .when(
      (value) => value.type === 'venue',
      (value) => {
        return (
          <StyledSearchItemLink key={value.id} href={`/venue/${value.id}`} onClick={item.onClick}>
            <SearchItemThumbnailCircle
              as="div"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <StyledSearchItemSubText>{value.name.at(0) ?? ''}</StyledSearchItemSubText>
            </SearchItemThumbnailCircle>
            <StyledSearchItemRightInfoWrapper>
              <StyledSearchItemMainText as="p" numberOfLines={1}>
                {value.name}
              </StyledSearchItemMainText>
              <StyledSearchItemSubText as="p" numberOfLines={1}>
                공연장
              </StyledSearchItemSubText>
            </StyledSearchItemRightInfoWrapper>
          </StyledSearchItemLink>
        )
      },
    )
    .otherwise(() => null)
}
