"use client"

import { TaskType } from "@/app/_helper-functions/types"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "./checkbox"
import { Button } from "./button"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu"
import { useTaskStore, useUserStore } from "@/app/_helper-functions/store"
import { completedTask, deleteTask, notCompletedTask } from "@/app/_helper-functions/api"
import { useToast } from "./use-toast"
import { Edit } from "lucide-react"
import EditTaskForm from "./EditTaskForm"
import { useState } from "react"

export const columns: ColumnDef<TaskType>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const token = useUserStore((state) => state.token)
      return (
        <>
        </>
        //   <Checkbox
        //   checked={
        //     table.getIsAllPageRowsSelected() ||
        //     (table.getIsSomePageRowsSelected() && "indeterminate") // when toggled will trigger edit tasks to change the completed or not the whole task under the category
        //   }
        //   onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //   aria-label="Select all"
        // />
      )
    },
    cell: ({ row }) => {
      const token = useUserStore((state) => state.token) 
      const setCompletedTask = useTaskStore((state) => state.setCompletedTask)
      const setNotCompletedTask = useTaskStore((state) => state.setNotCompletedTask)
      return (
        <Checkbox
          checked={row.getValue("completed") || row.getIsSelected()} //if checked will trigger the completedTask fucntion and also if the row.getValue('completed') === false it is not cheked and if tru it will be cheked automatically
          onCheckedChange={async(value) =>{
            if(token) {
              if (value === true) {
                const res = await completedTask(token, row.original.id)
                if(res.ok) {
                  row.toggleSelected(true)
                  row.getIsSelected()
                  setCompletedTask(row.original.id)
                  console.log(res)
                } else {

                }
              } else {
                const res = await notCompletedTask(token, row.original.id)
                if(res.ok) {
                  row.toggleSelected(false)
                  row.getIsSelected()
                  setNotCompletedTask(row.original.id)
                  console.log(res)
                } else {

                }
              }
            } else {

            }
          }} 
          aria-label="Select row"
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "completed",
    header: ({ column }) => {
      return (
        <Button
          className="text-2xl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} //sorted via completed or not
        >
          Remarks
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("completed") === false ? 'Not Completed' : 'Completed'}</div>, //if false === not complete, true === completed
  },
  {
    accessorKey: "description",
    header: "Tasks",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => {
      return (
        <Button
          className="text-2xl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} //sorted via date, near due dates to far
        >
          Due Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("due_date")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const taskId = row.original.id
      const token = useUserStore((state) => state.token)
      const setDeleteTask = useTaskStore((state) => state.deleteTask)
      const { toast } = useToast()
      const [open, setOpen] = useState(false)

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={async() => {
                try {
                  if(token) {
                    const res = await deleteTask(token, taskId)
                    if(res.ok) {
                      setDeleteTask(taskId)
                      toast({
                        title: "Deleted!",
                        description: "Successfully deleted a task",
                      })
                    } else {

                    }
                  } else {

                  }
                } catch(e) {
                  console.log(e)
                }
              }}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditTaskForm task={row.original} open={open} setOpen={setOpen}/>
        </>
      )
    },
  },
]
