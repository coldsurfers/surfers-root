import { create } from 'zustand'

type PaymentStore = {
  orderId: string
  orderName: string
  customerName: string
  customerEmail: string
  customerMobilePhone: string
  actions: {
    // eslint-disable-next-line no-unused-vars
    setPaymetStoreInfo: (params: {
      orderId: string
      orderName: string
      customerName: string
      customerEmail: string
      customerMobilePhone: string
    }) => void
  }
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  orderId: '',
  orderName: '',
  customerEmail: '',
  customerMobilePhone: '',
  customerName: '',
  actions: {
    setPaymetStoreInfo: (params) =>
      set(() => ({
        ...params,
      })),
  },
}))
