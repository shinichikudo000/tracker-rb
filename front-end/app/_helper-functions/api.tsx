import { useUserStore } from "./store";
import { CategoryFormSchema, signInFormSchema } from "./types";
import { z } from "zod"

export const API_URL_SIGN_IN = 'http://127.0.0.1:4000/users/tokens/sign_in'
export const API_URL_SIGN_UP = 'http://127.0.0.1:4000/users/tokens/sign_up'
export const API_URL = 'http://127.0.0.1:4000/api/v1/'

export async function signInPost(values: z.infer<typeof signInFormSchema>) {
    const res = await fetch(API_URL_SIGN_IN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
    })
    return res
}

export async function signUpPost(values: z.infer<typeof signInFormSchema>) {
    const res = await fetch(API_URL_SIGN_UP, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
    })
    return res
}

export async function getCategories(token: string) {
    const res = await fetch(`${API_URL}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    return res
}

export async function getSpecificCategories(id: number, token: string) {
    const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    return res
}

export async function deleteCategory(id:number, token:string) {
    const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    return res
}

export async function editCategory(values: z.infer<typeof CategoryFormSchema>, id:number, token:string) {
    const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(values)
    })
    return res
}

export async function postCategory(values: z.infer<typeof CategoryFormSchema>, token: string) {
    const res = await fetch(`${API_URL}/categories/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(values)
    })
    return res
}

export async function getTasks(token: string) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    return res
}