import { z } from 'zod';
import type { Link } from '../../(data)/data.types';

export type ShareModalProps = {
  visible: boolean;
  onClose: () => void;
  sharedLink: Link | null;
};

export const fetchOGJsonResponseSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
  url: z.string().url(),
});
