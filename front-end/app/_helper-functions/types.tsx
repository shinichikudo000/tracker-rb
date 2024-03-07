import { string, z } from "zod"

export const signInFormSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export const signUpFormSchema = z.object({
    email: z.string(),
    password: z.string(),
    'confirm-password': z.string()
})

export const CategoryFormSchema = z.object({
    name: z.string(),
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

export interface CategoryType {
    created_at: string;
    id: number;
    name: string;
    updated_at: string;
    user_id: number;
    tasks?: TaskType[] | null
}

export interface TaskType {
    id: number;
    category_id: number;
    user_id: number;
}

export interface TodoStore {
    categories: CategoryType[] | null;
    setCategories: (categories: CategoryType[] | null) => void;
    setTasks: (tasks: TaskType[]) => void;
    deleteCategory: (categoryId: number) => void;
    deleteTask: (categoryId: number, taskId: number) => void;
}