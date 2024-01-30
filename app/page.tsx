'use client'
import React, { useState } from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RegisterButton } from "@/components/auth/register-button";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { Badge } from "@/components/ui/badge";
import StarsCanvas from '@/components/starBg'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { IconJarLogoIcon } from "@radix-ui/react-icons";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {

  return (
    <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1b8d4b] to-[#055024] h-full flex items-center">
      <StarsCanvas/>
        <motion.div initial="hidden" animate="visible" className="flex  px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 z-30">
          <div className="mr-auto place-self-center lg:col-span-10 px-4 flex flex-col text-center sm:text-left justify-center items-center sm:justify-start sm:items-start">
                <motion.div variants={slideInFromTop}>
                  <Badge variant="outline" className="text-white">Cuida tu salud con</Badge>
                </motion.div>
                <motion.div variants={slideInFromLeft(0.4)} className="flex flex-col justify-center items-center sm:justify-start sm:items-start">
                    <h1 className={cn("text-6xl font-semibold text-white drop-shadow-lg flex items-center text-center",font.className,)}>
                      <Image src="/libélula.png" width={100} height={100} alt="logo" className="mr-2"/> Li<span className="text-[#2ecc71]">b</span> él
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl">Mantén un registro organizado de tus medicamentos para un cuidado de la salud más efectivo.</p>
                    <div className="flex items-center gap-6">
                      <RegisterButton mode="modal" asChild>
                          <Button variant="ghost" size="lg" className="font-medium text-white hover:bg-transparent p-0 hover:text-[#c5ffc5] hover:drop-shadow-sm">
                            Empieza gratis
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
                          </Button>
                        </RegisterButton>
                        <LoginButton mode="modal" asChild>
                          <Button variant="secondary" size="lg">
                            Acceder
                            </Button>
                        </LoginButton>
                    </div>
                </motion.div>
          </div>
          <motion.div variants={slideInFromRight(0.2)} className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center items-center">
              <Image src="/hero_img.png" width={550} height={200} alt="hero_img" className="object-cover"/>
            </motion.div>                
        </motion.div>
  </section>
  )
}