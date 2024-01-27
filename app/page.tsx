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
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]
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
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
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

export function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NavigationMenu className="z-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] bg-transparent flex flex-col items-start md:flex-row md:items-center">
      <motion.div initial="hidden" animate="visible">
        <motion.div variants={slideInFromTop}>
          <NavigationMenuList className="w-[100vw] flex-col items-start pt-10 md:items-center md:flex-row md:pt-0 hidden md:flex">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white text-md">Sobre la app</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <IconJarLogoIcon className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI and
                          Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem href="/docs/primitives/typography" title="Typography">
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white  text-md">Como utilizarla</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-white text-base`}>
                  Acceder
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </motion.div>
      </motion.div>

      <span className="block md:hidden ml-4 mt-6 text-2xl text-white bg-[#2ecc71] p-2 rounded cursor-pointer" onClick={()=>{setIsOpen(prev => !prev); console.log('open')}}>
        <RxHamburgerMenu/>
      </span>
      
      { isOpen && (
         <NavigationMenuList className="flex md:hidden w-[100vw] flex-col items-start pt-10 pl-0 ml-0 md:items-center md:flex-row md:pt-0">
         <NavigationMenuItem style={{ width:"95vw !important" }}>
           <NavigationMenuTrigger className="bg-transparent text-white text-md">Sobre la app</NavigationMenuTrigger>
           <NavigationMenuContent>
             <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
               <li className="row-span-3">
                 <NavigationMenuLink asChild>
                   <a
                     className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                     href="/"
                   >
                     <IconJarLogoIcon className="h-6 w-6" />
                     <div className="mb-2 mt-4 text-lg font-medium">
                       shadcn/ui
                     </div>
                     <p className="text-sm leading-tight text-muted-foreground">
                       Beautifully designed components built with Radix UI and
                       Tailwind CSS.
                     </p>
                   </a>
                 </NavigationMenuLink>
               </li>
               <ListItem href="/docs" title="Introduction">
                 Re-usable components built using Radix UI and Tailwind CSS.
               </ListItem>
               <ListItem href="/docs/installation" title="Installation">
                 How to install dependencies and structure your app.
               </ListItem>
               <ListItem href="/docs/primitives/typography" title="Typography">
                 Styles for headings, paragraphs, lists...etc
               </ListItem>
             </ul>
           </NavigationMenuContent>
         </NavigationMenuItem>
         <NavigationMenuItem style={{ margin:'0' }}>
           <NavigationMenuTrigger className="bg-transparent text-white text-md m-0">Como utilizarla</NavigationMenuTrigger>
           <NavigationMenuContent>
             <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] w-full">
               {components.map((component) => (
                 <ListItem
                   key={component.title}
                   title={component.title}
                   href={component.href}
                 >
                   {component.description}
                 </ListItem>
               ))}
             </ul>
           </NavigationMenuContent>
         </NavigationMenuItem>
       </NavigationMenuList>
      ) }

    </NavigationMenu>
  )
}
 
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground break-before-all">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"