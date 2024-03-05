import { CategoryType } from "@/app/_helper-functions/types"
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
export default function CategoryItem({category} : {category: CategoryType}) {
    return (
        <AccordionItem value={`category-${category.id}`}>
            <AccordionTrigger>{category.name}</AccordionTrigger>
            <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
        </AccordionItem>
    )
}