import { mmkvInstance, mmkvKeys } from '../storage';

export async function getAccessToken() {
  const authToken = mmkvInstance.getString(mmkvKeys.authToken);
  if (!authToken) {
    return null;
  }
  try {
    const parsedToken = JSON.parse(authToken) as {
      accessToken: string;
      refreshToken: string;
    };
    return parsedToken.accessToken;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getRefreshToken() {
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
