'use client'

import { getCategories } from "@/app/_helper-functions/api"
import { useUserStore } from "@/app/_helper-functions/store"
import { CategoryType } from "@/app/_helper-functions/types"
import CategoryItem from "@/components/CategoryItem"
import { Accordion } from "@/components/ui/accordion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CategoryPage() {
    const [categories, setCategories] = useState<CategoryType[]>([])
    const token = useUserStore((state) => state.token)

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const res = await getCategories(token)
                    if (res.ok) {
                        const data = await res.json()
                        setCategories(data)
                    } else {
                        throw new Error(`Failed to sign in: ${res.status}`)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }

        fetchData()
    }, [categories])
    return (
        <div>
            <Accordion type="single" collapsible>
                {categories.map((category) => (
                    <CategoryItem key={category.id} category={category}/>
                ))}
            </Accordion>
        </div>
    )
}