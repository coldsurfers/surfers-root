'use client';

import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useEffect, useRef, useState } from 'react';
import type { TicketOrder } from './types';

interface PaymentWidgetProps {
  order: TicketOrder;
  onPaymentSuccess: (paymentKey: string) => void;
  onPaymentError: (error: unknown) => void;
}

export function PaymentWidget({ order, onPaymentSuccess, onPaymentError }: PaymentWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentReady, setIsPaymentReady] = useState(false);
  const paymentWidgetRef = useRef<any>(null);
  const paymentMethodsWidgetRef = useRef<any>(null);
  const agreementWidgetRef = useRef<any>(null);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        // 토스페이먼츠 SDK 초기화
        const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_WIDGET_CLIENT_KEY;
        if (!clientKey) {
          throw new Error('TossPayments client key is not configured');
        }
        const tossPayments = await loadTossPayments(clientKey);

        // 고객 키 생성 (실제로는 사용자 ID나 세션 ID를 사용)
        const customerKey = `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // 결제위젯 인스턴스 생성
        paymentWidgetRef.current = tossPayments.widgets({
          customerKey,
        });

        // 결제 금액 설정
        await paymentWidgetRef.current.setAmount({
          value: order.amount,
          currency: 'KRW',
        });

        // 결제수단 UI 렌더링
        paymentMethodsWidgetRef.current = await paymentWidgetRef.current.renderPaymentMethods({
          selector: '#payment-methods',
          variantKey: 'DEFAULT',
        });

        // 이용약관 UI 렌더링
        agreementWidgetRef.current = await paymentWidgetRef.current.renderAgreement({
          selector: '#agreement',
          variantKey: 'DEFAULT',
        });

        // 결제수단 선택 이벤트 리스너
        paymentMethodsWidgetRef.current.on('paymentMethodSelect', (selectedPaymentMethod: any) => {
          console.log('Selected payment method:', selectedPaymentMethod);
        });

        setIsPaymentReady(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Payment widget initialization error:', error);
        onPaymentError(error);
        setIsLoading(false);
      }
    };

    initializePayment();

    // 컴포넌트 언마운트 시 위젯 정리
    return () => {
      if (paymentMethodsWidgetRef.current) {
        paymentMethodsWidgetRef.current.destroy();
      }
      if (agreementWidgetRef.current) {
        agreementWidgetRef.current.destroy();
      }
    };
  }, [order, onPaymentError]);

  const handlePayment = async () => {
    if (!paymentWidgetRef.current) {
      onPaymentError(new Error('결제 위젯이 초기화되지 않았습니다.'));
      return;
    }

    try {
      // 결제 요청
      const paymentResult = await paymentWidgetRef.current.requestPayment({
        orderId: order.orderId,
        orderName: order.orderName,
        customerEmail: order.customerEmail,
        customerName: order.customerName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });

      onPaymentSuccess(paymentResult.paymentKey);
    } catch (error) {
      console.error('Payment request error:', error);
      onPaymentError(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
          <p>결제 위젯을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">결제 정보</h2>

      <div className="mb-4 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold">{order.orderName}</h3>
        <p className="text-sm text-gray-600">이메일: {order.customerEmail}</p>
        <p className="text-sm text-gray-600">수량: {order.quantity}개</p>
        <p className="text-lg font-bold text-blue-600">{order.amount.toLocaleString()}원</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">결제 수단</h3>
        <div id="payment-methods" className="border rounded p-4" />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">이용약관</h3>
        <div id="agreement" className="border rounded p-4" />
      </div>

      <button
        type="button"
        onClick={handlePayment}
        disabled={!isPaymentReady}
        className={`w-full py-3 px-4 rounded font-semibold ${
          isPaymentReady
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isPaymentReady ? '결제하기' : '결제 준비 중...'}
      </button>
    </div>
  );
}
