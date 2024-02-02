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
import DeleteMedicine from "./delete_medicine"
import SeeMoreMedicine from "./see_more_medicine"
import { Badge } from "@/components/ui/badge"
import { Medicine } from "./medicines_columns"

export type Register = {
  id:                string
  userId:            string
  remediesId:        string
  dosis:             number
  start_at?:         Date | null
  lapsus?:            number | null
  isCompleted?:       Boolean | false | null
  time?:              string | null
  totalTime?:         number | null
  remedies?: Medicine[]
}

export const columns: ColumnDef<Register>[] = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    // },
    {
      accessorKey: "remedies.name",
      header: "Medicamento",
      // cell: ({ row }:{row : any}) => {
      //   return row.original.remedies.name
      // }
    },
    {
      accessorKey: "dosis",
      header: "Cantidad",
    },
    {
      accessorKey: "lapsus",
      header: "Cada",
      cell: ({ row }:{row : any}) => {
        let time = row.original.time
        let formattedLapsus = row.original.lapsus;
        if(time == 'hrs') {
          formattedLapsus = row.original.lapsus / 2
        }
      return (<div className="pl-4 font-medium">{formattedLapsus}</div>)
    },
    },
    // {
    //   accessorKey: "indications",
    //   header: "Indications",
    // },
    // {
    //   accessorKey: "contraindications",
    //   header: "Contraindications",
    // },
    {
      accessorKey: "time",
      header: "Unidad",
    },
    // {
    //   accessorKey: "description",
    //   header: "Description",
    // },
    // {
    //   accessorKey: "content",
    //   header: "Contenido",
    // },
    // {
    //   accessorKey: "unit",
    //   header: "Unidad",
    // },
    // {
    //   accessorKey: "type",
    //   header: "Tipo",
    // },
    {
      accessorKey: "start_at",
      // header: "Expira en",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Desde
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const expiresAtDate = new Date(row.getValue("start_at"));
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
    {
      accessorKey: "isCompleted",
      header: "Completado",
      cell: ({ row }) => {
        if(row.original.isCompleted){
          return <Badge variant="default">Completado</Badge>
        } else{
          return <Badge variant="success">Activo</Badge>
        }
      }
    },
    {
      header: "",
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
                            
              {/* <SeeMoreMedicine medicine={medicine}/>

              <DropdownMenuSeparator />

              <EditSheet medicine={medicine}/>

              <DropdownMenuSeparator />

              <DeleteMedicine medicine={medicine}/> */}

            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    },
  ];
