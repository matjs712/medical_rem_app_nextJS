import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Medicine } from "@/app/(protected)/_components/medicines_columns"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { CardDescription } from "@/components/ui/card"
import { CiCirclePlus } from "react-icons/ci"
const SeeMoreMedicine: React.FC<{ medicine: Medicine }> = ({ medicine }) => {
    let date = medicine.expires_at;
    if(typeof medicine.expires_at == 'string'){
        date = new Date(medicine.expires_at);
    }
  return (
    <Dialog>
        <DialogTrigger className="flex items-center gap-2 hover:bg-gray-300 w-full p-2 rounded-md">
          <CiCirclePlus/> 
          <span className="text-sm">Ver detalles</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">{ medicine.name } { medicine.isImportant ? <Badge variant="destructive" className="ml-2">Importante</Badge>:<Badge className="ml-2" variant="secondary">Común</Badge> }
            { medicine.type && <Badge variant="secondary" className="ml-2">{medicine.type}</Badge> }
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              <p className="text-justify">{medicine.description || 'Sin descripción'}</p>
            </DialogDescription>
            <DialogDescription>
              <Label className="font-bold text-black text-[15px]">Indicaciones</Label>
              <DialogDescription className="flex flex-col gap-2 mb-4">
                <p>{medicine.indications || 'Sin indicaciones'}</p>
              </DialogDescription>
              <Label className="font-bold text-black text-[15px]">Contraindicaciones</Label>
              <DialogDescription className="flex flex-col gap-2">
                <p>{medicine.contraindications || 'Sin contraindicaciones'}</p>
              </DialogDescription>
              
              { medicine.img && 
                <DialogDescription className="flex flex-col justify-center items-center gap-2 bg-[#333] mt-4 rounded-lg">
                  <Image src={`${medicine.img}`} width={150} height={130} alt={`${medicine.name}`}/>
                </DialogDescription>
              }

            </DialogDescription>
              
            <DialogDescription>
              <div className="flex w-full items-center gap-4 text-black my-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Contenido total</Label>
                    <CardDescription>{medicine.content ? medicine.content +' '+ medicine.unit : 'Sin registro'}</CardDescription>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="font-bold text-[15px]">Fecha de vencimiento</Label>
                    <CardDescription>{date && (date ? date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() : 'Sin registro')}</CardDescription>
                </div>
              </div>
            </DialogDescription>

          </DialogHeader>
        </DialogContent>
      </Dialog>
  )
}
export default SeeMoreMedicine;