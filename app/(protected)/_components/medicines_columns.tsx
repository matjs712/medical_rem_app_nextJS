"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpIcon, DotsVerticalIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EditSheet from "@/components/edit-sheet"
// import { Sheet, SheetTrigger } from "@/components/ui/sheet"

export type Medicine = {
    id:                string
    userId:            string
    name:              string
    dosis:             number
    unit:              string
    start_at:          Date
    indications:       string
    contraindications: string
    time:              number
    description:       string
    content:           number
    type:              string
    expires_at:        Date
    img:               string
    isImportant:       Boolean,
}

export const columns: ColumnDef<Medicine>[] = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    // },
    {
      accessorKey: "name",
      header: "Nombre",
    },
    // {
    //   accessorKey: "dosis",
    //   header: "Dosis",
    // },
    {
      accessorKey: "unit",
      header: "Unidad",
    },
    // {
    //   accessorKey: "start_at",
    //   header: "Start Date",
    // },
    // {
    //   accessorKey: "indications",
    //   header: "Indications",
    // },
    // {
    //   accessorKey: "contraindications",
    //   header: "Contraindications",
    // },
    // {
    //   accessorKey: "time",
    //   header: "Time",
    // },
    // {
    //   accessorKey: "description",
    //   header: "Description",
    // },
    {
      accessorKey: "content",
      header: "Contenido",
    },
    {
      accessorKey: "type",
      header: "Tipo",
    },
    {
      accessorKey: "expires_at",
      // header: "Expira en",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Expira en
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const expiresAtDate = new Date(row.getValue("expires_at"));
        const formattedDate = expiresAtDate ? 
          expiresAtDate.getDate() +
          '/' +
          (expiresAtDate.getMonth() + 1) +
          '/' +
          expiresAtDate.getFullYear() : '';
 
      return (<div className="pl-4 font-medium">{formattedDate}</div>)
    },
  },
    // {
    //   accessorKey: "img",
    //   header: "Image",
    // },
    // {
    //   accessorKey: "isImportant",
    //   header: "Is Important",
    // },
    // ,
    {
      header: "Acciones",
      id: "actions",
      cell: ({ row }) => {
        const medicine = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abir menú</span>
                <DotsVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem>
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <EditSheet medicine={medicine}/>
              <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    },
  ];
