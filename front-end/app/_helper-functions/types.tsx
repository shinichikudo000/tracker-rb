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
    token: string;
    refresh_token: string;
    resource_owner: ResourceOwnerType;

}

export interface ResourceOwnerType {
    created_at: string;
    email: string;
    id: number;
    updated_at: string
}