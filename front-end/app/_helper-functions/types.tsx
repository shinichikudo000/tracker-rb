import { ColumnDef } from "@tanstack/react-table"
import { string, z } from "zod"

export const signInFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const signUpFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    'confirm-password': z.string()
})

export const CategoryFormSchema = z.object({
    name: z.string(),
})

export const TaskFormSchema = z.object({
    category_id: z.string(),
    description: z.string(),
    completed: z.boolean(),
    due_date: z.date({
        required_error: "Due date is required",
    })
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
    description: string;
    due_date: string;
    completed: boolean;
}

export interface TodoStore {
    categories: CategoryType[] | null;
    setCategories: (categories: CategoryType[] | null) => void;
    setTasks: (tasks: TaskType[]) => void;
    deleteCategory: (categoryId: number) => void;
    deleteTask: (categoryId: number, taskId: number) => void;
    setCategory: (newCategory: CategoryType) => void;
    setTask: (categoryId: number, newTask: TaskType) => void;
    editCategory: (categoryId: number, values: CategoryType) => void;
    editTask: (categoryId: number, taskId: number, values: TaskType) => void;
}

export const data: TaskType[] = [
    {
      id: 1,
      category_id: 1,
      user_id: 1,
      description: 'do something',
      due_date: '2021',
      completed: false,
    },
]

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export interface TaskStore {
    tasks: TaskType[] | null;
    setTasks: (tasks: TaskType[]) => void;
    setCompletedTask: (taskId: number) => void;
    setNotCompletedTask: (taskId: number) => void;
    deleteTask: (taskId: number) => void
}

  