'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  const errorMessage = error || message || '결제 중 오류가 발생했습니다.';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* 실패 아이콘 */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="실패"
            >
              <title>실패</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-red-600 mb-4">결제에 실패했습니다</h1>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-red-800 mb-2">오류 정보</h2>
            <p className="text-red-700 text-sm">{errorMessage}</p>
            {code && <p className="text-red-600 text-xs mt-2">오류 코드: {code}</p>}
          </div>

          <div className="space-y-3">
            <Link
              href="/payment"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded font-semibold hover:bg-blue-700 transition-colors"
            >
              다시 결제하기
            </Link>

            <Link
              href="/"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            <p>결제가 완료되지 않았습니다.</p>
            <p>문제가 지속되면 고객센터로 문의해주세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
