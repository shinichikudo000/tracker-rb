'use client'

import { getCategories } from "@/app/_helper-functions/api"
import { useUserStore } from "@/app/_helper-functions/store"
import { useEffect, useState } from "react"

export default function CategoryPage() {
    const [categories, setCategories] = useState('')
    const token = useUserStore((state) => state.token)
    useEffect(() => {
        if(token) {
            try {
                getCategories(token)
            } catch(e){
                console.log(e)
            }
        } else {

        }
    }, [])
    return (
        <div>
        </div>
    )
}