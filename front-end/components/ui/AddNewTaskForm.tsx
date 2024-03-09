import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CategoryType, TaskFormSchema } from "@/app/_helper-functions/types"
import { toast } from "@/components/ui/use-toast"
import { postTask } from "@/app/_helper-functions/api"
import { useTaskStore, useTodoStore, useUserStore } from "@/app/_helper-functions/store"
import { useState } from "react"

export default function AddNewTaskForm({category} : {category?: CategoryType}) {
    const token = useUserStore((state) => state.token)
    const setNewTask = useTaskStore((state) => state.setNewTask)
    const [open, setOpen] = useState(false)
    const categories = useTodoStore((state) => state.categories)

    async function onSubmit(values: z.infer<typeof TaskFormSchema>) {
        try {
            if(token) {
    
                const res = await postTask(token, values);
                if(res.ok) {
                    const data = await res.json()
                    setNewTask(data)
                    setOpen(false)
                    console.log(data)
                    toast({
                        title: "New Task",
                        description: "Successfully created new task",
                    })
                } else {

                }
            } else {

            }
        } catch(e) {
            console.log(e)
        }
    }
    const form = useForm<z.infer<typeof TaskFormSchema>>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            description: '',
            category_id: category ? category.id.toString() : '',
            completed: false
        }
    })

    return (
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
                                name="category_id"
                                render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="category">Category</Label>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger id="category">
                                            <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                            { 
                                                categories?.map((category) => {
                                                return <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                                                })
                                            }
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="task description" {...field} className="bg-transparent w-full text-lg"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="due_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                            date < new Date()
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Don't let your procrastination gets you!
                                    </FormDescription>
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
    )
}