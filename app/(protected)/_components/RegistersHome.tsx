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
const RegistersHome = async () => {
    const remedies = await getRegisters();
    const mappedData = remedies?.map(({ remedies, ...rest }) => {
      return {
        rem: {
          id: remedies.id,
          userId: remedies.userId,
          name: remedies.name,
          dosis: remedies.dosis,
          unit: remedies.unit,
          start_at: remedies.start_at || new Date() || '',
          indications: remedies.indications || '',
          contraindications: remedies.contraindications || '',
          time: remedies.time || new Date() || '',
          description: remedies.description || '',
          isImportant: remedies.isImportant || false,
          expires_at: remedies.expires_at !== null ? new Date(remedies.expires_at) : new Date(),
          type: remedies.type || '',
          img: remedies.img || '',
          
        },
        // Puedes incluir otras propiedades si las hay
        ...rest,
      };
    });
    
  console.log(remedies);
//   <span key={i}>{rem.remedies.name || 'loadin'}</span>
  return (
    <>
        { mappedData?.map((rem, i) => (
            <>
               <Card className="w-[100%] lg:w-[300px] h-[280px]">
                    <CardHeader>
                        <CardTitle>{rem.rem.name}</CardTitle>
                        <CardDescription className="min-h-[80px]">{rem.rem.description ? rem.rem.description?.substring(0,130) + '...' : 'Sin descripción'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="flex justify-between w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Desde</Label>
                                <CardDescription>{rem.start_at ? (new Date(rem.start_at).getDate() + '/' + new Date(rem.start_at).getDay() + '/' + new Date(rem.start_at).getFullYear()) : 'Sin fecha de inicio'}</CardDescription>
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
                        <SeeMore rem={rem.rem} lapsus={rem.lapsus}/>
                      </NoSsr>
                        <Button variant="secondary" className="text-lg"><CiEdit /></Button>
                        <Button variant="complete" className="text-lg text-white font-bold"><CiSaveDown2 /></Button>
                    </CardFooter>
                </Card>
            </>
        )) }
    </>
  )
}

export default RegistersHome
