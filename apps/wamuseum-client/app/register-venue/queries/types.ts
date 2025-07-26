import { z } from 'zod';

export const kakaoSearchDocumentSchema = z.object({
  address_name: z.string(),
  category_group_code: z.string(),
  category_group_name: z.string(),
  category_name: z.string(),
  distance: z.string(),
  id: z.string(),
  phone: z.string(),
  place_name: z.string(),
  place_url: z.string(),
  road_address_name: z.string(),
  x: z.string(),
  y: z.string(),
});
