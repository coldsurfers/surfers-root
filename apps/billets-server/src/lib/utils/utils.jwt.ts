import { app } from '@/server';

export type JwtPayload = {
  id: string;
};

export const generateAuthToken = (userId: string) => {
  const authToken = {
    accessToken: app.jwt.sign(
      {
        id: userId,
      },
      {
        expiresIn: '1m',
      }
    ),
    refreshToken: app.jwt.sign(
      {
        id: userId,
      },
      {
        expiresIn: '60d',
      }
    ),
  };

  return authToken;
};
