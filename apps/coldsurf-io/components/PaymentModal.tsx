'use client'

import { Modal } from '@coldsurfers/hotsurf'
import { PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk'
import { nanoid } from 'nanoid'
import { useEffect, useRef } from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components'
import usePaymentWidgetQuery from '../queries/usePaymentWidgetQuery'
import { usePaymentStore } from '../stores/paymentStore'
import { CTAButton } from './CTAButton'

// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: customerKey는 구매자와 1:1 관계로 무작위한 고유값을 생성하세요.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
const clientKey = 'test_ck_AQ92ymxN34P2jB1qzPAp3ajRKXvd'
const customerKey = nanoid()

const CustomModal = styled.div`
  width: 750px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
  padding: 12px;
`

interface Props {
  isOpen?: boolean
  // eslint-disable-next-line no-unused-vars
  onClickBackground?: (event: GestureResponderEvent) => void
  price: number
}

export default function PaymentModal({ isOpen = false, onClickBackground, price }: Props) {
  const { orderId, orderName, customerEmail, customerMobilePhone, customerName } = usePaymentStore()
  const { data: paymentWidget } = usePaymentWidgetQuery(clientKey, customerKey)
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null)
  useEffect(() => {
    if (!isOpen || !paymentWidget) return
    // ------  결제위젯 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: price },
      { variantKey: 'DEFAULT' },
    )

    paymentMethodsWidgetRef.current = paymentMethodsWidget

    // ------  이용약관 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    paymentWidget.renderAgreement('#agreement', {
      variantKey: 'AGREEMENT',
    })
  }, [paymentWidget, isOpen])

  return (
    <Modal visible={isOpen} onPressBackground={onClickBackground}>
      <CustomModal>
        <div id="payment-widget" style={{ width: '100%' }} />
        <div id="agreement" style={{ width: '100%' }} />
        <CTAButton
          onPress={async () => {
            try {
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
              await paymentWidget?.requestPayment({
                orderId,
                orderName,
                customerEmail,
                customerMobilePhone,
                customerName,
                successUrl: `${window.location.origin}/payments/success`,
                failUrl: `${window.location.origin}/payments/fail`,
              })
            } catch (error) {
              // 에러 처리하기
              console.error(error)
            }
          }}
          text="구매하기"
        />
      </CustomModal>
    </Modal>
  )
}
