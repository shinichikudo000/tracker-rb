'use client'

import { getCategories, postCategory } from "@/app/_helper-functions/api"
import { useTodoStore, useUserStore } from "@/app/_helper-functions/store"
import { CategoryFormSchema, CategoryType } from "@/app/_helper-functions/types"
import CategoryItem from "@/components/ui/CategoryItem"
import { Accordion } from "@/components/ui/accordion"
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
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
  

export default function CategoryPage() {
    const token = useUserStore((state) => state.token)
    const categories = useTodoStore((state) => state.categories)
    const setCategories = useTodoStore((state) => state.setCategories)
    const [open, setOpen] = useState(false)

    const { toast } = useToast()

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const res = await getCategories(token)
                    if (res.ok) {
                        const data = await res.json()
                        setCategories(data)
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
                    setOpen(false)
                    toast({
                        title: "New Category",
                        description: "Successfully created new category",
                    })
                } else {

                }
            } else {

            }
        } catch(e) {
            console.log(e)
        }
    }
    return (
        <div className="w-full h-full">
            <div className="flex flex-row justify-end mr-4">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className="bg-zinc-800 text-2xl rounded-md p-2">Add</DialogTrigger>
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
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="category name" {...field} className="bg-transparent w-full text-lg"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
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
