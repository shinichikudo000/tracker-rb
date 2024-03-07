'use client'

import { getCategories, postCategory } from "@/app/_helper-functions/api"
import { useTodoStore, useUserStore } from "@/app/_helper-functions/store"
import { CategoryFormSchema, CategoryType } from "@/app/_helper-functions/types"
import CategoryItem from "@/components/ui/CategoryItem"
import { Accordion } from "@/components/ui/accordion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
  

export default function CategoryPage() {
    const token = useUserStore((state) => state.token)
    const categories = useTodoStore((state) => state.categories)
    const setCategories = useTodoStore((state) => state.setCategories)

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
    }, [])

    const form = useForm<z.infer<typeof CategoryFormSchema>>({
        resolver: zodResolver(CategoryFormSchema),
        defaultValues: {
            name: ''
        }
    })
    async function onSubmit(values: z.infer<typeof CategoryFormSchema>) {
        try {
            if(token) {
                const res = await postCategory(values, token)
                if(res.ok) {
                    const data = await res.json()
                    useSetCategory(data)
                } else {

                }
            } else {

            }
        } catch(e) {
            console.log(e)
        }
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger>Add</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="text" placeholder="category name" {...field} className="bg-transparent w-full text-lg"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            <Accordion type="single" collapsible>
                {categories?.map((category) => (
                    <CategoryItem key={category.id} category={category}/>
                ))}
            </Accordion>
        </div>
    )
}

function useSetCategory(data: any) {
    throw new Error("Function not implemented.")
}
