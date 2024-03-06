'use client'

import { deleteCategory } from "@/app/_helper-functions/api"
import { useTodoStore, useUserStore } from "@/app/_helper-functions/store"
import { CategoryType } from "@/app/_helper-functions/types"
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { MdDelete, MdModeEdit } from "react-icons/md"
  
export default function CategoryItem({category} : {category: CategoryType}) {
    const token = useUserStore((state) => state.token)
    const useDeleteCategory = useTodoStore((state) => state.deleteCategory)
    return (
        <AccordionItem value={`category-${category.id}`}>
            <AccordionTrigger>
                {category.name}
                <div className="absolute right-8 flex flex-row gap-4 z-10 isolate">
                    <MdModeEdit size={20}/>
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
                    }}/>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
        </AccordionItem>
    )
}