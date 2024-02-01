'use client'
import { updateStateRegister } from "@/actions/registers";
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
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { CiSaveDown2 } from "react-icons/ci"
import { DotLoader } from "react-spinners";
import { toast } from "sonner";

export function UpdateStateRegisters({ id }:{ id:string }) {

    const [ isPending, startTransition ] = useTransition();

    function handleComplete(){
        startTransition(async ()=> {
            try {
                await updateStateRegister(id)
                .then((resp)=>{
                    if(resp.success) {
                        // setSuccess(resp.success);
                        toast.success(resp.success, {
                        description: `Se ha actualizado el estado del registro con éxito!.`,
                        action: {
                            label: "Vísto",
                            onClick: () => console.log("Undo"),
                        },
                        });
                        
                    } else if(resp.error) {
                        toast.error(resp.error, {
                        description: `Error al intentar actualizar el estado del registro.`,
                        action: {
                            label: "Vísto",
                            onClick: () => console.log("Undo"),
                        },
                        });
                    }
                })
            } catch (error) {
                console.log(error);
            }
        })
    }

  return (
    <Drawer>
      <DrawerTrigger asChild>
      <Button variant="default" className="text-lg text-white font-bold"><CiSaveDown2 /></Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Estás a punto de finalizar tu tratamiento</DrawerTitle>
            <DrawerDescription>¿Estás seguro de marcar este registro como completado?</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            { isPending ? <Button className="mt-2 w-full" variant="complete" type="submit" disabled={isPending}><DotLoader size={20} color="#ffffff"/></Button> : <Button className="mt-2 w-full text-white" onClick={handleComplete} variant="complete">Completado</Button> }
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
