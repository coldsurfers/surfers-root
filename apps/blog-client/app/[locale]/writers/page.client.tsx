'use client'

import { useGetUsersQuery } from '@/lib'
import { Text } from '@coldsurfers/ocean-road'

import { Link } from 'i18n/routing'
import { ExtendedRecordMap } from 'notion-types'

import { NotionRenderer } from '@/features/notion'
import { StyledWritersPageHeader } from './page.styled'

export function WritersPageClient({ recordMap }: { recordMap: ExtendedRecordMap }) {
  const { data } = useGetUsersQuery()

  return (
    <div style={{ paddingTop: 24 }}>
      {data?.users.map((user) => {
        return (
          <div key={user.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
              <Link href="/resume" style={{ marginTop: 14, fontSize: 16, marginLeft: 'auto' }}>
                <Text style={{ textDecorationLine: 'underline' }}>Resume →</Text>
              </Link>
            </StyledWritersPageHeader>
          </div>
        )
      })}
    </div>
  )
}
