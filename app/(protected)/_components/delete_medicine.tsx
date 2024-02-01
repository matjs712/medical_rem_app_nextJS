'use client'
import { Medicine } from "@/app/(protected)/_components/medicines_columns"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { deleteMedicine } from "@/actions/remedies"
import { toast } from "sonner"
import { redirect } from 'next/navigation'
import { DotLoader } from "react-spinners"
import { Badge } from "@/components/ui/badge"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { CiTrash } from "react-icons/ci"

const DeleteMedicine: React.FC<{ medicine: Medicine }> = ({ medicine }) => {

     const  [isPending, startTransition] = useTransition()
    
     const onDelete = () => {
        startTransition(async ()=>{
            
            try {
                
                const data = await deleteMedicine({ id: medicine.id, url: medicine.img });
                if (data?.success) {
                toast.success(data?.success, {
                    description: `Se ha eliminado la medicina ${medicine.name} con éxito!`,
                    action: {
                    label: "Vísto",
                    onClick: () => console.log("Undo"),
                  },
                });
              } else if (data?.error) {
                toast.error(data?.error, {
                  description: `Error al eliminar la medicina ${medicine.name}`,
                  action: {
                      label: "Vísto",
                    onClick: () => console.log("Undo"),
                  },
                });
             }
            
            } catch (error) {
                console.log(error);
            } finally {
                redirect('/mis-medicamentos');
            }
        })
     }

  return (

    <Drawer>
    <DrawerTrigger className="flex items-center gap-2 hover:bg-gray-300 w-full p-2 rounded-md">
    <CiTrash />
    <span className="text-sm">Eliminar</span>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Estás a punto de eliminar <Badge variant="secondary" className="text-md">{medicine.name}</Badge> de tus registros.</DrawerTitle>
          <DrawerDescription>Esta acción es permanente, el medicamento { medicine.name } será eliminado de tu cuenta y junto a él los <Badge variant="secondary" className="text-sm">Regístros</Badge> asocíados a él.</DrawerDescription>
        </DrawerHeader>
        
        <DrawerFooter>
        { isPending ? <Button className="mt-2 w-full" type="submit" disabled={isPending}><DotLoader size={20} color="#ffffff"/></Button> : <Button className="mt-2 w-full" variant="destructive" type="submit" onClick={onDelete}>Eliminar</Button> }
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
  ) 
}

export default DeleteMedicine