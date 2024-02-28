import { signInFormSchema } from "./types";
import { z } from "zod"

export const API_URL_SIGN_IN = 'http://127.0.0.1:4000/users/tokens/sign_in'
export const API_URL_SIGN_UP = 'http://127.0.0.1:4000/users/tokens/sign_up'

export async function signInPost(values: z.infer<typeof signInFormSchema>) {
    const res = await fetch(API_URL_SIGN_IN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer XyQEFmT49DL8QXU_ChNTYrtDiKxxrPFoWgt3CzzGmMkWLecuex5wWxxAyxyS"
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
            "Authorization": "Bearer XyQEFmT49DL8QXU_ChNTYrtDiKxxrPFoWgt3CzzGmMkWLecuex5wWxxAyxyS"
        },
        body: JSON.stringify(values)
    })
    return res
}