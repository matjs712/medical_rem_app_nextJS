'use client'

import { usePathname } from "next/navigation";
import NavigationMenuDemo from "./NavigationMenuDemo";

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