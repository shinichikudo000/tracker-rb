'use client'
import { useEffect, useState } from "react"
import { useUserStore } from "../_helper-functions/store"
import { getCategories } from "../_helper-functions/api"

 

export default function HomePage() {
    const token = useUserStore((state) => state.token)
    const [categories, setCategories] = useState()
    useEffect(() => {
        try {
            if(token) {
                const data = getCategories(token)
            } else {
                
            }
        } catch(e) {
            console.log(e)
        }
    }, [])
    return (
        <>
        </>
    )
}