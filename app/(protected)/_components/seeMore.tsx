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

interface Remedie {
    name: string,
    unit: string ,
    start_at: Date ,
    indications: string ,
    contraindications: string ,
    time: Date ,
    description: string ,
    type: string ,
    expires_at: Date ,
    img: string ,
    isImportant: boolean
  }
const SeeMore = ({ rem, lapsus }:{rem: Remedie, lapsus: Date}) =>{
    return (
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="text-lg font-bold"><CiCirclePlus/></Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{ rem?.name }</DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              <p>{rem?.description || 'Sin descripción'}</p>
              <div className="flex justify-between w-full items-center gap-4 text-black mt-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold">Desde</Label>
                    <CardDescription>{rem.start_at ? (new Date(rem.start_at).getDate() + '/' + new Date(rem.start_at).getDay() + '/' + new Date(rem.start_at).getFullYear()) : 'Sin fecha de inicio'}</CardDescription>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold">Cada</Label>
                    <CardDescription>{lapsus ? lapsus + " horas" : 'Sin intervalo'}</CardDescription>
                </div>
             </div>
              
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  
    )
  }

export default SeeMore