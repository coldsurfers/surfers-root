export interface TicketOrder {
  orderId: string;
  orderName: string;
  amount: number;
  customerEmail: string;
  customerName: string;
  eventId: string;
  ticketType: string;
  quantity: number;
}

export interface PaymentRequest {
  orderId: string;
  orderName: string;
  amount: {
    value: number;
    currency: 'KRW';
  };
  customerEmail: string;
  customerName: string;
  successUrl: string;
  failUrl: string;
}

export interface PaymentResponse {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface PaymentResult {
  paymentKey: string;
  orderId: string;
  amount: number;
  status: 'DONE' | 'CANCELED' | 'PARTIAL_CANCELED' | 'WAITING_FOR_DEPOSIT' | 'ABORTED';
  approvedAt: string;
  method: string;
  orderName: string;
  customerEmail: string;
  customerName: string;
}

export interface TossPaymentsError {
  code: string;
  message: string;
}
