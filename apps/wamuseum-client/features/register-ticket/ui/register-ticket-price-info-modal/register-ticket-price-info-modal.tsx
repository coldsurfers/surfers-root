import { AddFormModal } from '@/ui'
import InputWithLabel from '@/ui/InputWithLabel'
import { useState } from 'react'
import { StyledAddPriceModalInner } from './register-ticket-price-info-modal.styled'
import { AddPriceInfoForm } from './register-ticket-price-info-modal.types'

export const RegisterTicketPriceInfoModal = ({
  visible,
  onClose,
  ticketId,
}: {
  visible: boolean
  onClose: () => void
  ticketId: string
}) => {
  const [addPriceForm, setAddPriceForm] = useState<AddPriceInfoForm[]>([
    {
      name: '',
      price: '',
      currency: '',
    },
  ])
  return (
    <AddFormModal
      title={'티켓 가격 정보'}
      visible={visible}
      onClose={onClose}
      onClickTopAddButton={() => {}}
      formListComponent={
        <>
          {addPriceForm.map((price, priceIndex) => {
            return (
              <StyledAddPriceModalInner key={priceIndex}>
                <InputWithLabel
                  value={price.name}
                  onChangeText={(text) => {
                    setAddPriceForm((prev) =>
                      prev.map((prevItem, prevIndex) => {
                        if (prevIndex === priceIndex) {
                          return {
                            ...prevItem,
                            name: text,
                          }
                        }
                        return prevItem
                      }),
                    )
                  }}
                  label="가격 종류"
                  placeholder="가격 종류"
                />
                <InputWithLabel
                  value={price.price}
                  onChangeText={(text) => {
                    setAddPriceForm((prev) =>
                      prev.map((prevItem, prevIndex) => {
                        if (prevIndex === priceIndex) {
                          return {
                            ...prevItem,
                            price: text,
                          }
                        }
                        return prevItem
                      }),
                    )
                  }}
                  label="가격"
                  placeholder="가격"
                />
                <InputWithLabel
                  value={price.currency}
                  onChangeText={(text) => {
                    setAddPriceForm((prev) =>
                      prev.map((prevItem, prevIndex) => {
                        if (prevIndex === priceIndex) {
                          return {
                            ...prevItem,
                            currency: text,
                          }
                        }
                        return prevItem
                      }),
                    )
                  }}
                  label="화폐단위"
                  placeholder="화폐단위"
                />
              </StyledAddPriceModalInner>
            )
          })}
        </>
      }
      onClickSubmitForm={() => {}}
    />
  )
}
