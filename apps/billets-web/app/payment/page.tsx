'use client';

import { PaymentWidget } from '@/libs/toss-payments/payment-widget';
import type { TicketOrder } from '@/libs/toss-payments/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);

  // URL 파라미터에서 주문 정보 가져오기 (실제로는 서버에서 검증된 데이터를 사용해야 함)
  const order: TicketOrder = {
    orderId: searchParams.get('orderId') || `order_${Date.now()}`,
    orderName: searchParams.get('orderName') || '콘서트 티켓',
    amount: Number.parseInt(searchParams.get('amount') || '50000'),
    customerEmail: searchParams.get('email') || 'customer@example.com',
    customerName: searchParams.get('name') || '홍길동',
    eventId: searchParams.get('eventId') || '',
    ticketType: searchParams.get('ticketType') || '일반',
    quantity: Number.parseInt(searchParams.get('quantity') || '1'),
  };

  const handlePaymentSuccess = async (paymentKey: string) => {
    setIsProcessing(true);

    try {
      // 결제 승인 API 호출
      const response = await fetch('/api/payments/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentKey,
          orderId: order.orderId,
          amount: order.amount,
        }),
      });

      if (!response.ok) {
        throw new Error('결제 승인에 실패했습니다.');
      }

      await response.json();

      // 결제 성공 페이지로 리다이렉트
      router.push(`/payment/success?paymentKey=${paymentKey}&orderId=${order.orderId}`);
    } catch (error) {
      console.error('Payment confirmation error:', error);
      router.push(
        `/payment/fail?error=${encodeURIComponent(error instanceof Error ? error.message : '알 수 없는 오류')}`
      );
    }
  };

  const handlePaymentError = (error: unknown) => {
    console.error('Payment error:', error);
    const errorMessage = error instanceof Error ? error.message : '결제 중 오류가 발생했습니다.';
    router.push(`/payment/fail?error=${encodeURIComponent(errorMessage)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8">티켓 결제</h1>

        {isProcessing ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
              <p>결제를 처리하는 중...</p>
            </div>
          </div>
        ) : (
          <PaymentWidget
            order={order}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        )}
      </div>
    </div>
  );
}
