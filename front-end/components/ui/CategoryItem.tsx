'use client'

import { deleteCategory } from "@/app/_helper-functions/api"
import { useTodoStore, useUserStore } from "@/app/_helper-functions/store"
import { CategoryFormSchema, CategoryType } from "@/app/_helper-functions/types"
import { Input } from "@/components/ui/input"
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useState } from "react"
import { MdDelete, MdModeEdit } from "react-icons/md"
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
import { IoMdClose } from "react-icons/io"
  
export default function CategoryItem({category} : {category: CategoryType}) {
    const token = useUserStore((state) => state.token)
    const useDeleteCategory = useTodoStore((state) => state.deleteCategory)
    const [edit, setEdit] = useState(false)
    const form = useForm<z.infer<typeof CategoryFormSchema>>({
        resolver: zodResolver(CategoryFormSchema),
        defaultValues: {
            name: category.name
        }
    })
    async function onSubmit(values: z.infer<typeof CategoryFormSchema>) {
    }
    return (
        <AccordionItem value={`category-${category.id}`}>
            <AccordionTrigger>
                {
                    edit === false ? category.name : (
                        <div className="w-[80%] flex flex-row gap-2">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="text" defaultValue={category.name} {...field} className="bg-transparent w-full text-lg"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                </form>
                            </Form>
                            <IoMdClose onClick={() => setEdit(false)}/>
                        </div>
                    )
                }
                <div className="absolute right-8 flex flex-row gap-4 z-10 isolate">
                    <MdModeEdit size={20} onClick={() => {
                        setEdit(!edit)
                    }}/>
                    <MdDelete size={20} onClick={() => {
                        const fetchData = async () => {
                            if(token) {
                                const res = await deleteCategory(category.id, token)
                                if(res.ok) {
                                    useDeleteCategory(category.id)
                                }
                            } else { 
                            }
                        }
                        fetchData()
                    }}/>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
        </AccordionItem>
    )
}