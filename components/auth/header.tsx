import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
};

export const Header = ({
  label,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Link href="/">
        <h1 className={cn("text-6xl font-semibold text-black drop-shadow-md flex items-center text-center",font.className,)}>
                <Image src="/libélula.png" width={100} height={100} alt="logo" className="mr-2"/> Li<span className="text-[#2ecc71]">b</span> él
              </h1>
        <p className="text-muted-foreground text-sm">
          {label}
        </p>
      </Link>
    </div>
  );
};
