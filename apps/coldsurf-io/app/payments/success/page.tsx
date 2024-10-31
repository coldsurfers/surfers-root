import axios, { AxiosError } from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

// ------ Payment 객체 ------
// @docs https://docs.tosspayments.com/reference#payment-객체
interface Payment {
  orderName: string
  approvedAt: string
  receipt: {
    url: string
  }
  totalAmount: number
  method: '카드' | '가상계좌' | '계좌이체'
  paymentKey: string
  orderId: string
}

interface PaymentsSuccessPageSearchParams {
  orderId: string
  paymentKey: string
  amount: string
}

const clientSecret = 'test_sk_oEjb0gm23PWwz7wWblvN8pGwBJn5'

// eslint-disable-next-line consistent-return
const getPaymentsInfo = async (params: PaymentsSuccessPageSearchParams) => {
  try {
    const { data: payment } = await axios.post<Payment>('https://api.tosspayments.com/v1/payments/confirm', params, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientSecret}:`).toString('base64')}`,
      },
    })
    return payment
  } catch (e) {
    const err = e as AxiosError<{
      code: number
      message: string
    }>
    redirect(
      `/payments/fail?code=${
        err.response?.data?.code
      }&message=${encodeURIComponent(err.response?.data?.message ?? '')}`,
    )
  }
}

const PaymentsSuccessPage: NextPage<{
  params: {
    //
  }
  searchParams: PaymentsSuccessPageSearchParams
}> = async (props) => {
  const payment = await getPaymentsInfo(props.searchParams)

  return (
    <main>
      <div className="result wrapper">
        <div className="box_section">
          <h2 style={{ padding: '20px 0px 10px 0px' }}>
            <img width="35px" src="https://static.toss.im/3d-emojis/u1F389_apng.png" />
            결제 성공
          </h2>
          <p>paymentKey = {payment.paymentKey}</p>
          <p>orderId = {payment.orderId}</p>
          <p>amount = {payment.totalAmount.toLocaleString()}원</p>

          <div>
            <Link href="https://docs.tosspayments.com/guides/payment-widget/integration">
              <button className="button" style={{ marginTop: '30px', marginRight: '10px' }}>
                연동 문서
              </button>
            </Link>
            <Link href="https://discord.gg/A4fRFXQhRu">
              <button
                className="button"
                style={{
                  marginTop: '30px',
                  backgroundColor: '#e8f3ff',
                  color: '#1b64da',
                }}
              >
                실시간 문의
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PaymentsSuccessPage
