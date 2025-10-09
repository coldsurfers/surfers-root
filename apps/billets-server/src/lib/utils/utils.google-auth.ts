import type { PlatformDTO } from '@/dtos/auth.dto';
import { match } from 'ts-pattern';

export const getGoogleOAuthAudienceClientId = (platform: PlatformDTO) => {
  return match(platform)
    .with('ios', () => process.env.GOOGLE_OAUTH_IOS_CLIENT_ID)
    .with('android', 'web', () => process.env.GOOGLE_OAUTH_WEB_CLIENT_ID)
    .exhaustive();
};
