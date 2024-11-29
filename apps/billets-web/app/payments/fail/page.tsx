import { NextPage } from 'next'
import Link from 'next/link'

const PaymentsFailPage: NextPage<{
  searchParams: {
    code: string
    message: string
  }
}> = (props) => (
  <main>
    <div className="result wrapper">
      <div className="box_section">
        <h2 style={{ padding: '20px 0px 10px 0px' }}>
          <img width="30px" src="https://static.toss.im/3d-emojis/u1F6A8-apng.png" />
          결제 실패
        </h2>
        <p>code = {props.searchParams.code ?? 'UNKNOWN_ERROR'}</p>
        <p>message = {props.searchParams.message ?? '알 수 없음'}</p>

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

export default PaymentsFailPage
