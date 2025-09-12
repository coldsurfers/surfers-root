import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');

    if (!paymentKey || !orderId) {
      return NextResponse.json({ error: 'paymentKey와 orderId가 필요합니다.' }, { status: 400 });
    }

    // 토스페이먼츠 결제 조회 API 호출
    const response = await fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.TOSS_PAYMENTS_SECRET_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || '결제 정보 조회에 실패했습니다.' },
        { status: response.status }
      );
    }

    const paymentResult = await response.json();
    return NextResponse.json(paymentResult);
  } catch (error) {
    console.error('Payment result fetch error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
