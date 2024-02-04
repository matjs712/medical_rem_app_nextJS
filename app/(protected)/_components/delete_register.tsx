'use client'
import { DeleteRegister } from "@/actions/registers"
import { Button } from "@/components/ui/button"
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
import { TrashIcon } from "@radix-ui/react-icons"
import { redirect } from "next/navigation"
import { useTransition } from "react"
import { DotLoader } from "react-spinners"
import { toast } from "sonner"

export function DeleteRegisters({ id } : { id:string }) {

    const [ isPending, startTransition ] = useTransition()

    const onDelete = () => {
        startTransition(async ()=>{
            try {
                DeleteRegister(id)
                .then((resp)=>{
                    if(resp?.success){
                        toast.success(resp.success, {
                            description: `Se ha eliminado el registro con éxito!`,
                            action: {
                            label: "Vísto",
                            onClick: () => console.log("Undo"),
                            },
                        });
                    } else if(resp.error) {
                        toast.error(resp.error, {
                            description: `Error al intentar eliminar el registro`,
                            action: {
                            label: "Vísto",
                            onClick: () => console.log("Undo"),
                            },
                        });
                    }
                });
            } catch (error) {
                console.log(error)
            } finally {
                redirect('/registros');
            }
        })
    }

  return (
    <Drawer>
      <DrawerTrigger className="w-full">
        <Button variant="outline" className="w-full flex items-center gap-2 justify-start"><TrashIcon/>Eliminar registro</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Estás a punto de eliminar un registro</DrawerTitle>
            <DrawerDescription>Esta acción es irreversible, estás seguro de proceder con la operación?</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={onDelete} variant="destructive" disabled={isPending}>{ isPending ? <DotLoader color="white" className="w-full" size={16}/> : "Eliminar"
             }</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
