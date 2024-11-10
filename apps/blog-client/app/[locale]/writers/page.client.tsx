'use client'

import { useGetUsersQuery } from '@/lib'
import { Paragraph } from '@/ui'
import { Link } from 'i18n/routing'
import { useTranslations } from 'next-intl'
import { StyledWritersPageHeader } from './page.styled'

export function WritersPageClient() {
  const t = useTranslations()
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
