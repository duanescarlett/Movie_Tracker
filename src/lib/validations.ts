import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})
 
export type FormStateReg =
  | {
      errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})
   
export type FormStateLog =
| {
    errors?: {
      email?: string[]
      password?: string[]
    }
    message?: string
  }
| undefined

export const FilmFinderSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }).trim(),
  // year: z
  //   .string()
  //   .regex(/^\d{4}$/, { message: 'Year must be a 4-digit number.' })
  //   .trim(),
  // plot: z.enum(['short', 'full'], { message: 'Plot must be either "short" or "full".' }),
})

export type FilmFinderLog =
  | {
      errors?: {
        title?: string[]
        year?: string[]
        plot?: string[]
      }
      message?: string
    }
  | undefined
