import { Button } from "@/components/ui/button"
import { CiCirclePlus } from "react-icons/ci";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Label } from "@/components/ui/label"
import { CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Medicine } from "./medicines_columns";

interface Remedie {
  name: string,
  unit: string ,
  dosis: number,
  start_at: Date ,
  indications: string ,
  contraindications: string ,
  time: string,
  description: string ,
  type: string ,
  expires_at: Date,
  content: number | null,
  img: string ,
  isImportant: boolean
}

const SeeMoreRegister = ({ rem }: { rem: any }) => {
  console.log('rem',rem);
    return (
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="w-full flex items-center gap-2 font-normal"><CiCirclePlus/> Ver detalles</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">{ rem?.remedies.name } { rem.remedies.isImportant ? <Badge variant="destructive" className="ml-2">Importante</Badge>:<Badge className="ml-2" variant="secondary">Común</Badge> }</DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              <p className="text-justify">{rem?.remedies.description || 'Sin descripción'}</p>
              <div className="flex justify-between w-full items-center gap-4 text-black my-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Desde</Label>
                    <CardDescription>{
                    rem.remedies.start_at ? new Date(rem.remedies.start_at).getUTCDate().toString().padStart(2, '0') + '/' + ( new Date(rem.remedies.start_at).getUTCMonth() + 1).toString().padStart(2, '0') + '/' +  new Date(rem.remedies.start_at).getUTCFullYear() : 'Sin fecha de inicio'
                    }</CardDescription>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Cada</Label>
                    <CardDescription>{rem.lapsus ?  rem.time == 'hrs' ? (rem.lapsus/2) + " horas" : rem.lapsus + " minutos" : 'Sin registro'  }</CardDescription>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Durante</Label>
                    <CardDescription>{rem.totalTime ? rem.totalTime : 'Sin tiempo registrado'}</CardDescription>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Dosis</Label>
                    <CardDescription>{rem?.dosis ? rem?.dosis + ' ' + rem.remedies.unit : 'Sin registro'}</CardDescription>
                </div>
             </div>
              
            </DialogDescription>
            
            <DialogDescription className="text-start">
              <Label className="font-bold text-black text-[15px]">Indicaciones</Label>
              <DialogDescription className="flex flex-col gap-2 mb-4">
                <p>{rem.remedies.indications || 'Sin indicaciones'}</p>
              </DialogDescription>
              <Label className="font-bold text-black text-[15px]">Contraindicaciones</Label>
              <DialogDescription className="flex flex-col gap-2">
                <p>{rem.remedies.contraindications || 'Sin contraindicaciones'}</p>
              </DialogDescription>
              
              { rem?.remedies.img && 
                <DialogDescription className="flex flex-col justify-center items-center gap-2 bg-[#333] mt-4 rounded-lg">
                  <Image src={`${rem.remedies.img}`} width={150} height={130} alt={`${rem?.remedies.name}`}/>
                </DialogDescription>
              }

            </DialogDescription>
              
            <DialogDescription>
              <div className="flex w-full items-center gap-4 text-black my-4 justify-between">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Contenido total</Label>
                    <CardDescription>{rem?.remedies.content ? rem?.remedies.content +' '+ rem.remedies.unit : 'Sin registro'}</CardDescription>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Fecha de vencimiento</Label>
                    <CardDescription>{rem.remedies.expires_at ?  new Date(rem.remedies.expires_at).getDate() + '/' + ( new Date(rem.remedies.expires_at).getMonth() + 1) + '/' +  new Date(rem.remedies.expires_at).getFullYear() : 'Sin registro'}</CardDescription>
                </div>
              </div>
            </DialogDescription>

          </DialogHeader>
        </DialogContent>
      </Dialog>
  
    )
  }

export default SeeMoreRegister