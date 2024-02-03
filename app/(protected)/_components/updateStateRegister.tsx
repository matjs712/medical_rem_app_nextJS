'use client'
import { getRegister, updateStateRegister } from "@/actions/registers";
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
import { useEffect, useState, useTransition } from "react";
import { CiSaveDown2 } from "react-icons/ci"
import { DotLoader } from "react-spinners";
import { toast } from "sonner";
import { Register } from "./medicines_columns";
import { Badge } from "@/components/ui/badge";

export function UpdateStateRegisters({ id, type }:{ id:string, type?:string }) {

    const [ isPending, startTransition ] = useTransition();
    const [registro, setRegistro] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            } finally {
              if(type){
                redirect("/registros")
              }
            }
        })
    }

    useEffect(() => {

      const getRegisterData = async () => {
        setIsLoading(true);
        try {
          const register = await getRegister(id);
          console.log('a',register);
          setRegistro(register);
        } catch (error) {
          console.log(error);
        } finally{
          setIsLoading(false);
        }
      }
      getRegisterData();
    }, [])
    

  return (
    <Drawer>
      <DrawerTrigger asChild>
      <Button variant="outline" className={!type ? "text-lg font-bold" : "w-full flex items-center gap-2 font-normal justify-start"}>
        <CiSaveDown2 />
        { type && 'Cambiar estado' }
      </Button>
      </DrawerTrigger>
      <DrawerContent>
          { 
          isLoading ?
          <div className="mx-auto w-full h-[242px] max-w-sm flex items-center justify-center">
           <DotLoader size={20} color="black"/> 
          </div> : 

          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
            <DrawerTitle>{!type ? `Estás a punto de finalizar tu tratamiento` : registro.isCompleted ? "Estás a punto de retomar tu tratamiento" : "Estás a punto de finalizar tu tratamiento"}</DrawerTitle>
            <DrawerDescription>Actualizarás el registro asociado al medicamento <Badge variant="secondary">{registro.remedies?.name}</Badge></DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            { isPending ? <Button className="mt-2 w-full" variant="complete" type="submit" disabled={isPending}><DotLoader size={20} color="#ffffff"/></Button> : 
             registro.isCompleted ? <Button className="mt-2 w-full text-white" onClick={handleComplete} variant="default">Retomar</Button> : <Button className="mt-2 w-full text-white" onClick={handleComplete} variant="complete">Completado</Button>
             }
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
          </div>
          }
      </DrawerContent>
    </Drawer>
  )
}
