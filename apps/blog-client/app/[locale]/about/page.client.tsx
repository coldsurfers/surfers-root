'use client'

import { useGetUsersQuery } from '@/lib'

import { ExtendedRecordMap } from 'notion-types'

import { NotionRenderer } from '@/features/notion'
import { Text } from '@coldsurfers/ocean-road'
import { Link } from 'i18n/routing'
import { StyledWritersPageHeader } from './page.styled'

export function WritersPageClient({ recordMap }: { recordMap: ExtendedRecordMap }) {
  const { data } = useGetUsersQuery()

  return (
    <div style={{ marginTop: '6.5rem' }}>
      {data?.users.map((user) => {
        return (
          <div key={user.id}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={user.avatar_url ?? ''}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  marginRight: 12,
                }}
              />
              <p>{user.name}</p>
            </div>
            <StyledWritersPageHeader>
              <NotionRenderer recordMap={recordMap} />
              <Link
                href={{
                  pathname: '/about/[user]',
                  params: {
                    user: 'paul',
                  },
                }}
                style={{ marginTop: 14, fontSize: 16, marginLeft: 'auto' }}
              >
                <Text style={{ textDecorationLine: 'underline' }}>More →</Text>
              </Link>
            </StyledWritersPageHeader>
          </div>
        )
      })}
    </div>
  )
}
