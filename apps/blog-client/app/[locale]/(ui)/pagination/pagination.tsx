import { Text } from '@coldsurfers/ocean-road'
import { Link } from 'i18n/routing'
import { MoveLeftIcon, MoveRightIcon, PageMoveButton } from './pagination.styled'
import { PaginationProps } from './pagination.types'

export function Pagination({ currPage, wholePage }: PaginationProps) {
  return (
    <div style={{ display: 'flex', marginTop: '2rem', marginBottom: '5rem' }}>
      <Text as="p">
        {currPage}/{wholePage}
      </Text>
      <Link
        href={{
          pathname: '/',
          query: {
            page: currPage - 1 > 0 ? currPage - 1 : 1,
          },
        }}
      >
        <PageMoveButton>
          <MoveLeftIcon />
        </PageMoveButton>
      </Link>
      <Link
        href={{
          pathname: '/',
          query: {
            page: currPage + 1 > wholePage ? wholePage : currPage + 1,
          },
        }}
      >
        <PageMoveButton>
          <MoveRightIcon />
        </PageMoveButton>
      </Link>
    </div>
  )
}
