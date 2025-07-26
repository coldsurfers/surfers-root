import { z } from 'zod';

const CommonAppUpdateInfoDTOSchema = z.object({
  latestVersion: z.string(),
  forceUpdate: z.boolean(),
  updateType: z.enum(['native', 'ota']),
});

export const AppUpdateInfoDTOSchema = z.object({
  ios: CommonAppUpdateInfoDTOSchema,
  android: CommonAppUpdateInfoDTOSchema,
});
export type AppUpdateInfoDTO = z.infer<typeof AppUpdateInfoDTOSchema>;
