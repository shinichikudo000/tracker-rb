'use client'

import { useTaskStore } from "@/app/_helper-functions/store"
import { columns } from "@/components/ui/columns"
import { DataTable } from "@/components/ui/data-table"
import AddNewTaskForm from "@/components/ui/AddNewTaskForm"

  

export default function TaskPage() {
    const tasks = useTaskStore((state) => state.tasks)

    return (
        <div className="w-full h-full">
            <AddNewTaskForm />
            <div className="w-full h-full p-4">
                {
                    tasks && <DataTable columns={columns} data={tasks} />
                }
            </div>
        </div>
    )
}


