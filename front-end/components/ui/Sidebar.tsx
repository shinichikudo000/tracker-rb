"use client"

import { useMemo } from "react"
import Box from "./Box"
import { usePathname } from "next/navigation"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import { IoIosAddCircle } from "react-icons/io"
import { BiLogOut } from "react-icons/bi";
import SidebarItem from "./SidebarItem"

export default function Sidebar() {
    const pathname = usePathname()

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname === '',
            href: '/'
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search'
        },
        {
            icon: IoIosAddCircle,
            label: 'New',
            active: pathname === '/new',
            href: '/new'
        }
    ], [])

    const logout = {
        icon: BiLogOut,
        label: 'Log Out',
        href: '/sign-in'
    }
    return (
        <Box className="
            hidden 
            md:flex
            h-full
            w-[200px]
            font-latin
            text-lg
            relative
        ">
            <div className="
                w-full
                flex
                flex-col
                justify-center
                items-center
                px-8
            ">
            {
                routes.map((item) => ( <SidebarItem  key={item.label} {...item}/>))
            }
                <div className="absolute bottom-4">
                    <SidebarItem  key={logout.label} {...logout}/>
                </div>
            </div>
        </Box>
    )
}