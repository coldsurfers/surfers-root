import { ErrorResponse } from '@/lib/error'
import { sendEmail } from '@/lib/mailer'
import { sendUserVoiceBodySchema } from '@/routes/mailer/mailer.types'
import { format } from 'date-fns'
import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { z } from 'zod'

interface SendUserVoiceRoute extends RouteGenericInterface {
  Body: z.infer<typeof sendUserVoiceBodySchema>
  Reply: {
    500: ErrorResponse
  }
}

export const sendUserVoiceHandler = async (
  req: FastifyRequest<SendUserVoiceRoute>,
  rep: FastifyReply<SendUserVoiceRoute>,
) => {
  try {
    const { email, name, message, updateAgreement } = req.body
    await sendEmail({
      from: process.env.BILLETS_SERVER_MAILER_EMAIL_ADDRESS,
      smtpOptions: {
        service: process.env.BILLETS_SERVER_MAILER_SERVICE,
        auth: {
          user: process.env.BILLETS_SERVER_MAILER_EMAIL_ADDRESS,
          pass: process.env.BILLETS_SERVER_MAILER_EMAIL_APP_PASSWORD,
        },
      },
      to: process.env.BILLETS_SERVER_MAILER_EMAIL_ADDRESS,
      subject: 'Billets User Voice ' + format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      html: `
        <h1>사용자 Voice</h1>
        <p>이메일: ${email}</p>
        <p>이름: ${name}</p>
        <p>내용: ${message}</p>
        <p>업데이트 동의: ${updateAgreement ? 'Yes' : 'No'}</p>
      `,
    })
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
