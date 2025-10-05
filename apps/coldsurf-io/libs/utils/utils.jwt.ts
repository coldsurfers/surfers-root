import jwt from 'jsonwebtoken';

export const generateAppleClientSecret = () => {
  const privateKey = process.env.APPLE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '';

  const token = jwt.sign({}, privateKey, {
    algorithm: 'ES256',
    issuer: process.env.APPLE_TEAM_ID,
    subject: process.env.APPLE_CLIENT_ID,
    audience: 'https://appleid.apple.com',
    expiresIn: '1h',
    keyid: process.env.APPLE_KEY_ID,
  });

  return token;
};
