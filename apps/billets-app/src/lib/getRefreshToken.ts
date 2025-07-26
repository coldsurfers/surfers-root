import { mmkvInstance, mmkvKeys } from './storage';

export default async function getRefreshToken() {
  const authToken = mmkvInstance.getString(mmkvKeys.authToken);
  if (!authToken) {
    return null;
  }
  try {
    const parsedToken = JSON.parse(authToken) as {
      accessToken: string;
      refreshToken: string;
    };
    return parsedToken.refreshToken;
  } catch (e) {
    console.error(e);
    return null;
  }
}
