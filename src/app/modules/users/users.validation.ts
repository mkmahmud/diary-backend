import { z } from 'zod'

// Users zod valdation
const usersZodSchema = z.object({
  body: z.object({
    fullName: z.string({
      required_error: 'Full Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

export const usersValidation = {
  usersZodSchema,
}
