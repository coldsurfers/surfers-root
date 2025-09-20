import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type { SendUserVoiceBodyDTO } from '@/dtos/mailer.dto';
import { sendEmail } from '@/lib/mailer';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';

interface SendUserVoiceRoute extends RouteGenericInterface {
  Body: SendUserVoiceBodyDTO;
  Reply: {
    500: ErrorResponseDTO;
  };
}

export const sendUserVoiceHandler = async (
  req: FastifyRequest<SendUserVoiceRoute>,
  rep: FastifyReply<SendUserVoiceRoute>
) => {
  try {
    const { email, name, message, updateAgreement, phone } = req.body;
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
      subject: `${SERVICE_NAME} User Voice ' + format(new Date(), 'yyyy-MM-dd HH:mm:ss')`,
      html: `
        <h1>사용자 Voice</h1>
        <p>이메일: ${email}</p>
        <p>이름: ${name}</p>
        <p>내용: ${message}</p>
        <p>업데이트 동의: ${updateAgreement ? 'Yes' : 'No'}</p>
        <p>회선점: ${phone}</p>
      `,
    });
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
