'use client';

import type { PaymentResult } from '@/libs/toss-payments/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const fetchPaymentResult = async () => {
      if (!paymentKey || !orderId) {
        setIsLoading(false);
        return;
      }

      try {
        // 결제 결과 조회 API 호출
        const response = await fetch(
          `/api/payments/result?paymentKey=${paymentKey}&orderId=${orderId}`
        );

        if (response.ok) {
          const result = await response.json();
          setPaymentResult(result);
        }
      } catch (error) {
        console.error('Failed to fetch payment result:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentResult();
  }, [paymentKey, orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4" />
          <p>결제 결과를 확인하는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* 성공 아이콘 */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="성공"
            >
              <title>성공</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-green-600 mb-4">결제가 완료되었습니다!</h1>

          {paymentResult && (
            <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="font-semibold mb-3">결제 정보</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">주문번호:</span>
                  <span className="font-mono">{paymentResult.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제키:</span>
                  <span className="font-mono text-xs">{paymentResult.paymentKey}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">상품명:</span>
                  <span>{paymentResult.orderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제금액:</span>
                  <span className="font-semibold">{paymentResult.amount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제수단:</span>
                  <span>{paymentResult.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제일시:</span>
                  <span>{new Date(paymentResult.approvedAt).toLocaleString('ko-KR')}</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded font-semibold hover:bg-blue-700 transition-colors"
            >
              홈으로 돌아가기
            </Link>

            <Link
              href="/my-tickets"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              내 티켓 보기
            </Link>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            <p>결제 완료 후 이메일로 티켓이 발송됩니다.</p>
            <p>문의사항이 있으시면 고객센터로 연락해주세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
