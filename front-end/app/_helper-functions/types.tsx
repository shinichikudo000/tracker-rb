import { z } from "zod"

export const signInFormSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const signUpFormSchema = z.object({
    email: z.string(),
    password: z.string(),
    'confirm-password': z.string()
})