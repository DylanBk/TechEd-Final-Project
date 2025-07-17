import * as z from 'zod';


// USER SCHEMA

export const signupSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .trim(),
  email: z
    .email({ error: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be at most 32 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
      { message: "Password must include upper and lower case letters, a number, and a symbol." }
    )
    .trim(),
  referralCode: z
    .string()
    .length(6)
    .trim()
    .optional(),
});

export const loginSchema = z.object({
  email: z
    .email({ error: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be at most 32 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
      { message: "Password must include upper and lower case letters, a number, and a symbol." }
    )
    .trim()
});


// PRODUCT SCHEMA

export const ProductSchema = z.object({
  id: z.string({ error: "Product ID is required" }),
  category: z.string({ error: "Category is required" }),
  name: z.string({ error: "Product name is required" }),
  description: z.string({ error: "Description is required" }),
  price: z.string({ error: "Price is required" }),
  image: z.object({
    src: z.string({ error: "Image source is required" }),
    alt: z.string({ error: "Image alt text is required" }),
  }),
  handcraftedHours: z.number().optional(),
  edition: z.string().optional(),
  materials: z.array(z.string()).optional(),
});