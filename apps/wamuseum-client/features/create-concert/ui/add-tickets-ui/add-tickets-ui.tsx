'use client'

import { AddButton } from '@/ui'
import InputWithLabel from '@/ui/InputWithLabel'
import Label from '@/ui/Label'
import UploadFormDateInput from '@/ui/UploadFormDateInput'
import { Button, Spinner } from '@coldsurfers/ocean-road'
import isValid from 'date-fns/isValid'
import { useCallback, useState } from 'react'
import useCreateConcertTicket from '../../../../app/concert/[id]/mutations/useCreateConcertTicket'
import {
  UseConcertTicketsDataT,
  UseConcertTicketsInputT,
  concertTicketsQuery,
} from '../../../../app/concert/[id]/queries/useConcertTickets'
import { StyledAddTicketsUIContent } from './add-tickets-ui.styled'
import { formatDate, parseDate } from './add-tickets-ui.utils'

export const AddTicketsUI = ({ concertId }: { concertId: string }) => {
  const [mutateCreateConcertTicket, { loading: loadingCreateConcertTicket }] = useCreateConcertTicket({})

  const [addTicketsForm, setAddTicketsForm] = useState<
    {
      name: string
      website: string
      opendate: string
    }[]
  >([])

  const addTicketInput = useCallback(() => {
    setAddTicketsForm((prev) =>
      prev.concat({
        name: '',
        website: '',
        opendate: '',
      }),
    )
  }, [])

  const removeTicketInput = useCallback((index: number) => {
    setAddTicketsForm((prev) => prev.filter((value, prevIndex) => prevIndex !== index))
  }, [])

  return (
    <>
      <StyledAddTicketsUIContent>
        <AddButton onClick={addTicketInput} />
      </StyledAddTicketsUIContent>
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
