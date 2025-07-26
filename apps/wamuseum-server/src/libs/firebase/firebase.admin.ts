import admin from 'firebase-admin';
import type { FirebaseMessageData, TopicType } from './firebase.types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../../../assets/firebase/firebase-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendMessageToDevice = async ({
  token,
  title,
  body,
  data,
}: {
  token: string;
  title: string;
  body: string;
  data: FirebaseMessageData;
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
  });
  return response;
};

const sendMessageToTopic = async ({
  topic,
  title,
  body,
  data,
}: {
  topic: TopicType;
  title: string;
  body: string;
  data: FirebaseMessageData;
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
  });
  return response;
};

export const firebaseAdmin = {
  sendMessageToDevice,
  sendMessageToTopic,
};
