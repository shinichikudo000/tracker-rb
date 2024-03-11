'use client'

import { useTaskStore, useUserStore } from "@/app/_helper-functions/store"
import { columns } from "@/components/ui/columns"
import { DataTable } from "@/components/ui/data-table"
import AddNewTaskForm from "@/components/ui/AddNewTaskForm"
import { useEffect } from "react"
import { getTodayTasks } from "@/app/_helper-functions/api"

  

export default function TodayTasks() {
    const setTodayTasks = useTaskStore((state) => state.setTodayTasks)
    const todayTasks = useTaskStore((state) => state.todayTasks)
    const token = useUserStore((state) => state.token)
    const date = new Date().toISOString().split('T')[0]
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const res = await getTodayTasks(token, date)
                    if (res.ok) {
                        const data = await res.json()
                        setTodayTasks(data)
                    } else {

                    }
                }
            } catch (error) {
                console.error("Error fetching today's tasks:", error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="w-full h-full">
            {
                todayTasks && <DataTable columns={columns} data={todayTasks} />
            }
        </div>
    )
}


