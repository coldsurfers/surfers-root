'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { TicketOrder } from './types';

// 티켓 구매 버튼 컴포넌트 예시
export function TicketPurchaseButton({
  eventId,
  ticketType,
  price,
}: {
  eventId: string;
  ticketType: string;
  price: number;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);

    try {
      // 주문 정보 생성
      const order: TicketOrder = {
        orderId: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        orderName: `${ticketType} 티켓`,
        amount: price,
        customerEmail: 'customer@example.com', // 실제로는 사용자 정보에서 가져옴
        customerName: '홍길동', // 실제로는 사용자 정보에서 가져옴
        eventId,
        ticketType,
        quantity: 1,
      };

      // 결제 페이지로 이동 (주문 정보를 URL 파라미터로 전달)
      const params = new URLSearchParams({
        orderId: order.orderId,
        orderName: order.orderName,
        amount: order.amount.toString(),
        email: order.customerEmail,
        name: order.customerName,
        eventId: order.eventId,
        ticketType: order.ticketType,
        quantity: order.quantity.toString(),
      });

      router.push(`/payment?${params.toString()}`);
    } catch (error) {
      console.error('Purchase error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePurchase}
      disabled={isLoading}
      className={`px-6 py-3 rounded font-semibold ${
        isLoading
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isLoading ? '처리 중...' : `${price.toLocaleString()}원 구매하기`}
    </button>
  );
}

// 이벤트 상세 페이지에서 사용하는 예시
export function EventDetailPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">콘서트 이벤트</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">이벤트 정보</h2>
          <p>날짜: 2024년 3월 15일</p>
          <p>장소: 서울 올림픽공원</p>
          <p>시간: 오후 7시</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">티켓 구매</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded">
              <div>
                <h3 className="font-semibold">일반 티켓</h3>
                <p className="text-sm text-gray-600">좌석: A구역</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">50,000원</p>
                <TicketPurchaseButton
                  eventId="concert_2024_03_15"
                  ticketType="일반"
                  price={50000}
                />
              </div>
            </div>

            <div className="flex justify-between items-center p-4 border rounded">
              <div>
                <h3 className="font-semibold">VIP 티켓</h3>
                <p className="text-sm text-gray-600">좌석: S구역</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">100,000원</p>
                <TicketPurchaseButton
                  eventId="concert_2024_03_15"
                  ticketType="VIP"
                  price={100000}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
