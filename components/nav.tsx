'use client'
import { NavigationMenuDemo } from "@/app/page"
import { usePathname } from "next/navigation";

const Nav = () => {
    const path = usePathname();

    if(path != '/') {
        return <></>
    }

  return (
    <NavigationMenuDemo/>
  )
}

export default Nav