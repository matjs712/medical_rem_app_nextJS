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

interface Remedie {
    name: string,
    unit: string ,
    dosis: number,
    start_at: Date ,
    indications: string ,
    contraindications: string ,
    time: number,
    description: string ,
    type: string ,
    expires_at: Date,
    content: number | null,
    img: string ,
    isImportant: boolean
  }
  const SeeMore = ({ rem, lapsus, start_at, time }: 
    { rem: Remedie; lapsus: number | null; start_at: Date | null; time: number | null }) => {    return (
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="text-lg font-bold"><CiCirclePlus/></Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">{ rem?.name } { rem.isImportant ? <Badge variant="destructive" className="ml-2">Importante</Badge>:<Badge className="ml-2" variant="secondary">Común</Badge> }</DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              <p className="text-justify">{rem?.description || 'Sin descripción'}</p>
              <div className="flex justify-between w-full items-center gap-4 text-black my-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Desde</Label>
                    <CardDescription>{start_at ? (start_at.getDate() + '/' + start_at.getDay() + '/' + start_at.getFullYear()) : 'Sin fecha de inicio'}</CardDescription>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Cada</Label>
                    <CardDescription>{lapsus ? lapsus + " horas" : 'Sin intervalo'}</CardDescription>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Durante</Label>
                    <CardDescription>{time ? time + " dias" : 'Sin tiempo registrado'}</CardDescription>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Dosis</Label>
                    <CardDescription>{rem?.dosis ? rem?.dosis + ' ' + rem.unit : 'Sin registro'}</CardDescription>
                </div>
             </div>
              
            </DialogDescription>
            
            <DialogDescription>
              <Label className="font-bold text-black text-[15px]">Indicaciones</Label>
              <DialogDescription className="flex flex-col gap-2 mb-4">
                <p>{rem.indications || 'Sin indicaciones'}</p>
              </DialogDescription>
              <Label className="font-bold text-black text-[15px]">Contraindicaciones</Label>
              <DialogDescription className="flex flex-col gap-2">
                <p>{rem.contraindications || 'Sin contraindicaciones'}</p>
              </DialogDescription>
              
              { rem?.img && 
                <DialogDescription className="flex flex-col justify-center items-center gap-2 bg-[#333] mt-4 rounded-lg">
                  <Image src={`${rem.img}`} width={150} height={130} alt={`${rem?.name}`}/>
                </DialogDescription>
              }

            </DialogDescription>
              
            <DialogDescription>
              <div className="flex w-full items-center gap-4 text-black my-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Contenido total</Label>
                    <CardDescription>{rem?.content ? rem?.content +' '+ rem.unit : 'Sin registro'}</CardDescription>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Fecha de vencimiento</Label>
                    <CardDescription>{rem.expires_at ? (rem.expires_at.getDate() + '/' + rem.expires_at.getDay() + '/' + rem.expires_at.getFullYear()) : 'Sin registro'}</CardDescription>
                </div>
              </div>
            </DialogDescription>

          </DialogHeader>
        </DialogContent>
      </Dialog>
  
    )
  }

export default SeeMore