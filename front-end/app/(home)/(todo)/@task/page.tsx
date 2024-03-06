'use client'
import { getTasks } from "@/app/_helper-functions/api"
import { useUserStore } from "@/app/_helper-functions/store"
import { useEffect } from "react"

export default function TaskPage() {
    const token = useUserStore((state) => state.token)
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const res = await getTasks(token)
                    if (res.ok) {
                        const data = await res.json()
                        console.log(data)
                    } else {
                        throw new Error(`Failed to sign in: ${res.status}`)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }

        fetchData()
    }, [])
    return (
        <div>
            <p>task</p>
        </div>
    )
}