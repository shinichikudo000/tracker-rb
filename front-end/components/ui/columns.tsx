"use client"

import { TaskType } from "@/app/_helper-functions/types"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<TaskType>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "description",
    header: "Tasks",
  },
  {
    accessorKey: "completed",
    header: "Amount",
  },
]
