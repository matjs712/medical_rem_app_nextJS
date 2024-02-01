// 'use server'
import { getRegisters } from "@/data/registers"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CiSaveDown2 } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import SeeMore from "./seeMore";
import NoSsr from '@mui/material/NoSsr';
import { Badge } from "@/components/ui/badge";
import { UpdateStateRegisters } from "./updateStateRegister";
const RegistersHome = async () => {
    const registers = await getRegisters();
    let id = '';    
    const mappedData = registers?.map(({ remedies, ...rest }) => {
      return {
        rem: {
          id: remedies.id,
          userId: remedies.userId,
          name: remedies.name,
          dosis: rest.dosis,
          unit: remedies.unit,
          content: remedies.content,
          start_at: remedies.start_at ? new Date(remedies.start_at) : new Date(),
          indications: remedies.indications || '',
          contraindications: remedies.contraindications || '',
          time: rest.time || '',
          description: remedies.description || '',
          isImportant: remedies.isImportant || false,
          expires_at: remedies.expires_at ? new Date(remedies.expires_at) : new Date(),
          type: remedies.type || '',
          img: remedies.img || '',
        },
        ...rest,
        registerId: rest.id,
      };
    });
    
  return (
    <>
        { mappedData?.map((rem, i) => (
            <>
               <Card className="w-[100%] lg:w-[300px] h-[280px]">
                    <CardHeader>
                        <CardTitle className="flex items-center">{ rem.rem.name } { rem.rem.isImportant ? <Badge variant="destructive" className="ml-2">Importante</Badge>:<Badge className="ml-2" variant="secondary">Común</Badge> }</CardTitle>
                        <CardDescription className="min-h-[80px] text-justify">{rem.rem.description ? rem.rem.description?.substring(0,130) + '...' : 'Sin descripción'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="flex justify-between w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Desde</Label>
                                <CardDescription>{rem.start_at ? (rem.start_at.getDate() + '/' + rem.start_at.getDay() + '/' + rem.start_at.getFullYear()) : 'Sin fecha de inicio'}</CardDescription>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Cada</Label>
                                <CardDescription>{rem.lapsus ? rem.lapsus + " horas" : 'Sin intervalo'}</CardDescription>
                            </div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-start gap-2">
                      <NoSsr>
                        <SeeMore rem={rem.rem} start_at={rem.start_at} lapsus={rem.lapsus}/>
                      </NoSsr>
                        <Button variant="secondary" className="text-lg"><CiEdit /></Button>

                        <UpdateStateRegisters id={ rem.registerId }/>

                    </CardFooter>
                </Card>
            </>
        )) }
    </>
  )
}

export default RegistersHome
