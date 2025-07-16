import * as z from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  category: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  // Provenance data
  handcraftedHours: z.number().optional(),
  edition: z.string().optional(), // e.g., "1 of 1", "One of Five"
  materials: z.array(z.string()).optional(),
});