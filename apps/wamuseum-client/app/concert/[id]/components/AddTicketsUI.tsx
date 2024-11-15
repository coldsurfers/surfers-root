'use client'

import { AddButton } from '@/ui'
import InputWithLabel from '@/ui/InputWithLabel'
import Label from '@/ui/Label'
import UploadFormDateInput from '@/ui/UploadFormDateInput'
import { Button, Spinner } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import format from 'date-fns/format'
import isValid from 'date-fns/isValid'
import { useCallback, useState } from 'react'
import useCreateConcertTicket from '../mutations/useCreateConcertTicket'
import { UseConcertTicketsDataT, UseConcertTicketsInputT, concertTicketsQuery } from '../queries/useConcertTickets'

const Content = styled.h3`
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: 600;
`

const parseDate = (dateString: string) => {
  const year = dateString.slice(0, 2)
  const month = dateString.slice(2, 4)
  const day = dateString.slice(4, 6)
  const hour = dateString.slice(6, 8)
  const min = dateString.slice(8, 10)
  const parsed = new Date(`20${year}-${month}-${day} ${hour}:${min}`)
  return parsed
}

const formatDate = (date: Date) => (isValid(date) ? format(date, 'yyyy-MM-dd hh:mm a') : '올바르지 않은 날짜입니다')

const AddTicketsUI = ({ concertId }: { concertId: string }) => {
  const [mutateCreateConcertTicket, { loading: loadingCreateConcertTicket }] = useCreateConcertTicket({})

  const [addTicketsForm, setAddTicketsForm] = useState<
    {
      name: string
      website: string
      opendate: string
      ticketPrices: number[]
    }[]
  >([])

  const addTicketInput = useCallback(() => {
    setAddTicketsForm((prev) =>
      prev.concat({
        name: '',
        website: '',
        opendate: '',
        ticketPrices: [],
      }),
    )
  }, [])

  const removeTicketInput = useCallback((index: number) => {
    setAddTicketsForm((prev) => prev.filter((value, prevIndex) => prevIndex !== index))
  }, [])

  return (
    <>
      <Content style={{ display: 'flex', alignItems: 'center' }}>
        <AddButton onPress={addTicketInput} />
      </Content>
      {addTicketsForm.map((ticket, ticketIndex) => (
        <div key={ticketIndex} style={{ display: 'flex', alignItems: 'center' }}>
          <InputWithLabel
            value={ticket.name}
            onChangeText={(text) => {
              setAddTicketsForm((prev) =>
                prev.map((prevItem, prevIndex) => {
                  if (prevIndex === ticketIndex) {
                    return {
                      ...prevItem,
                      name: text,
                    }
                  }
                  return prevItem
                }),
              )
            }}
            label="티켓 예매처 이름"
            placeholder="티켓 예매처 이름"
          />
          <InputWithLabel
            value={ticket.website}
            onChangeText={(text) => {
              setAddTicketsForm((prev) =>
                prev.map((prevItem, prevIndex) => {
                  if (prevIndex === ticketIndex) {
                    return {
                      ...prevItem,
                      website: text,
                    }
                  }
                  return prevItem
                }),
              )
            }}
            label="티켓 예매 사이트"
            placeholder="티켓 예매 사이트"
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Label>{`티켓 오픈 날짜\n(${formatDate(parseDate(ticket.opendate))})`}</Label>
            <UploadFormDateInput
              value={ticket.opendate}
              onChangeText={(text) => {
                setAddTicketsForm((prev) =>
                  prev.map((prevItem, prevIndex) => {
                    if (prevIndex === ticketIndex) {
                      return {
                        ...prevItem,
                        opendate: text,
                      }
                    }
                    return prevItem
                  }),
                )
              }}
              placeholder={'티켓 오픈 날짜'}
            />
          </div>
          <div>
            <Button
              style={{
                width: 10,
                height: 10,
              }}
              color={'indigo'}
              onClick={() => {
                const isValidOpenDate = isValid(parseDate(ticket.opendate))
                if (!isValidOpenDate) {
                  alert('Invalid Ticket Open Date')
                  return
                }
                mutateCreateConcertTicket({
                  variables: {
                    input: {
                      concertId,
                      openDate: parseDate(ticket.opendate).toISOString(),
                      seller: ticket.name,
                      sellingURL: ticket.website,
                    },
                  },
                  onCompleted: () => {
                    removeTicketInput(ticketIndex)
                  },
                  update: (cache, { data }) => {
                    if (data?.createConcertTicket.__typename !== 'Ticket') {
                      return
                    }
                    const { createConcertTicket: addedConcertTicketData } = data
                    const cacheData = cache.readQuery<UseConcertTicketsDataT, UseConcertTicketsInputT>({
                      query: concertTicketsQuery,
                      variables: {
                        concertId,
                      },
                    })
                    if (cacheData?.concertTickets.__typename === 'TicketList') {
                      cache.writeQuery({
                        query: concertTicketsQuery,
                        variables: {
                          concertId,
                        },
                        data: {
                          concertTickets: {
                            ...cacheData.concertTickets,
                            list: cacheData.concertTickets.list?.concat({
                              ...addedConcertTicketData,
                            }),
                          },
                        },
                      })
                    }
                  },
                })
              }}
            >
              ﹢
            </Button>
            <Button
              style={{
                width: 10,
                height: 10,
              }}
              color={'pink'}
              onClick={() => setAddTicketsForm((prev) => prev.filter((_, index) => index !== ticketIndex))}
            >
              ✘
            </Button>
          </div>
        </div>
      ))}
      {loadingCreateConcertTicket ? <Spinner variant="page-overlay" /> : null}
    </>
  )
}

export default AddTicketsUI
