import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Image from "next/image";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})


const HomeNav= () => {
  return (
    <div className="space-y-6 text-center">
        <div className="flex flex-col items-center">
            <h1 className={cn(
            "text-6xl font-semibold text-white drop-shadow-md flex items-center text-center",
            font.className,
            )}>
            <Image src="/libélula.png" width={100} height={100} alt="logo" className="mr-2"/> Libél
            </h1>
            <p className="text-white text-lg">Mantén un registro organizado de tus medicamentos.</p>
        </div>
        <div>
        <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
            Acceder
            </Button>
        </LoginButton>
        </div>
    </div>
  )
}

export default HomeNav