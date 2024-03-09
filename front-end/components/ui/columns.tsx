"use client"

import { TaskType } from "@/app/_helper-functions/types"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "./checkbox"
import { Button } from "./button"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu"

export const columns: ColumnDef<TaskType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate") // when toggled will trigger edit tasks to change the completed or not the whole task under the category
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)} // when toggled will trigger edit tasks to change the specific category
        aria-label="Select row"
      />
    ),
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("completed")}</div>, //if false === not complete, true === completed
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
//   {
//     accessorKey: "amount",
//     header: () => <div className="text-right">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"))

//       // Format the amount as a dollar amount
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount)

//       return <div className="text-right font-medium">{formatted}</div>
//     },
//   },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
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
            <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem> 
            <DropdownMenuItem onClick={() => {}}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
