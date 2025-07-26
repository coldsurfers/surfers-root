import { z } from 'zod';

export const RemoteAppManifestDTOSchema = z.object({
  settings: z.object({
    latestVersion: z.string(),
  }),
});
export type RemoteAppManifestDTO = z.infer<typeof RemoteAppManifestDTOSchema>;
