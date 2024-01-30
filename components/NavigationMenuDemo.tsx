'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { IconJarLogoIcon } from "@radix-ui/react-icons";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
export default function NavigationMenuDemo() {
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