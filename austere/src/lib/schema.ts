import * as z from 'zod';

export const SignupSchema = z.object({
    name: z
        .string()
        .min(2)
        .max(50)
        .trim(),
    email: z
        .email(),
    password: z
        .string()
        .min(8)
        .max(32)
        .trim()
});

export const ProductSchema = z.object({
    id: z
        .string()
        .trim(),
    category: z
        .string()
        .trim(),
    name: z
        .string()
        .min(1)
        .trim(),
    description: z
        .string()
        .min(1)
        .trim(),
    price: z
        .string()
        .trim(),
    image: z.object({
        src: z.string().trim(),
        alt: z.string().trim()
    })
});