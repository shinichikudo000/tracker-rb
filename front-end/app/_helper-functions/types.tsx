import { string, z } from "zod"

export const signInFormSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const signUpFormSchema = z.object({
    email: z.string(),
    password: z.string(),
    'confirm-password': z.string()
})

export interface UserType {
    token?: string | null;
    refresh_token?: string | null;
    resource_owner?: ResourceOwnerType | null;
}

export interface ResourceOwnerType {
    created_at?: string | null;
    email?: string | null;
    id?: number | null;
    updated_at?: string | null
}
