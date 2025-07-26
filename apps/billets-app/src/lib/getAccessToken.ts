import { mmkvKeys } from './storage/constants';
import { mmkvInstance } from './storage/mmkvInstance';

export default async function getAccessToken() {
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
