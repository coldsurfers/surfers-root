import admin from 'firebase-admin'
import { BaseMessage } from 'firebase-admin/lib/messaging/messaging-api'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../../assets/firebase/firebase-service-account-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export const sendMessageToDevice = async ({
  token,
  title,
  body,
  data,
}: {
  token: string
  title: string
  body: string
  data: BaseMessage['data']
}) => {
  const response = await admin.messaging().send({
    token,
    notification: {
      title,
      body,
    },
    data,
    android: {
      priority: 'high',
    },
    apns: {
      headers: {
        'apns-priority': '10',
      },
      payload: {
        aps: {
          sound: 'default',
        },
      },
    },
  })
  return response
}

export const sendMessageToTopic = async ({
  topic,
  title,
  body,
  data,
}: {
  topic: string
  title: string
  body: string
  data: BaseMessage['data']
}) => {
  const response = await admin.messaging().send({
    topic,
    notification: {
      title,
      body,
    },
    data,
    android: {
      priority: 'high',
    },
    apns: {
      headers: {
        'apns-priority': '10',
      },
      payload: {
        aps: {
          sound: 'default',
        },
      },
    },
  })
  return response
}
