import * as z from 'zod';

export const CustomizationSchema = z.object({
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  materials: z.array(z.string()),
  embellishments: z.array(z.object({
    name: z.string(),
    price: z.string(),
    description: z.string()
  })).optional(),
  hardwareOptions: z.array(z.object({
    name: z.string(),
    price: z.string(),
    description: z.string()
  })).optional()
});

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
  edition: z.string().optional(),
  materials: z.array(z.string()).optional(),
  // Customization options
  customization: CustomizationSchema
});