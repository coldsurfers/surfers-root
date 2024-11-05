'use client'

import { Paragraph } from '@/ui'
import { UserObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Link } from 'i18n/routing'
import { useTranslations } from 'next-intl'
import { StyledWritersPageHeader } from './page.styled'

export function WritersPageClient({ users }: { users: UserObjectResponse[] }) {
  const t = useTranslations()
  return (
    <div style={{ paddingTop: 24 }}>
      {users.map((user) => {
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
              <Paragraph style={{ fontSize: 16, fontWeight: '400', marginTop: 12 }}>
                {t('WritersPage.paul.about')}
              </Paragraph>
              <Link href="/resume" style={{ marginTop: 14, fontSize: 16, marginLeft: 'auto' }}>
                <Paragraph style={{ textDecorationLine: 'underline' }}>Resume →</Paragraph>
              </Link>
            </StyledWritersPageHeader>
          </div>
        )
      })}
    </div>
  )
}
