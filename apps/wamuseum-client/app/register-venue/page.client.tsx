'use client'

import { Spinner, Text, TextInput } from '@coldsurfers/hotsurf'
import styled from '@emotion/styled'
import { useDebounce } from '@uidotdev/usehooks'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import useCreateVenueMutation from './mutations/useCreateVenueMutation'
import useSearchVenueQuery from './queries/useSearchVenueQuery'

const RegisterVenueClientPage = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 350)
  const { data: searchedVenues } = useSearchVenueQuery({
    variables: {
      keyword: debouncedKeyword,
    },
  })
  const [mutateCreateVenue, { loading: loadingCreateVenue }] = useCreateVenueMutation({})

  const searchResult = useMemo(() => {
    if (searchedVenues?.searchVenue.__typename === 'SearchedVenueList') {
      return searchedVenues.searchVenue.list ?? []
    }
    return []
  }, [searchedVenues])

  return (
    <Wrapper>
      <TextInput placeholder="공연 장소 검색하기" value={keyword} onChangeText={setKeyword} style={{ width: 520 }} />
      {searchResult.map((result) => {
        if (!result || !result.y || !result.x || !result.place_name) {
          return null
        }
        return (
          <div
            key={result.id}
            onClick={() => {
              mutateCreateVenue({
                variables: {
                  input: {
                    lat: +result.y!,
                    lng: +result.x!,
                    name: result.place_name!,
                  },
                },
                onCompleted: () => {
                  router.push('/')
                },
              })
            }}
          >
            <Text>{result.place_name}</Text>
          </div>
        )
      })}
      {loadingCreateVenue ? <Spinner /> : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
`

export default RegisterVenueClientPage
