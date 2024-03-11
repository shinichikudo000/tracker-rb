'use client'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React, { useState } from "react"

export default function TodoLayout({
    children,
    task,
    category
}: {
    children: React.ReactNode,
    task: React.ReactNode,
    category: React.ReactNode
}) {
    const [show, setShow] = useState('category')

    const showButtonStyle = 'group inline-flex h-10 w-max items-center justify-center rounded-md bg-zinc-800 focus:text-white focus:outline-none' 
    return (
        <div>
            <div className="align-self-end">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <button className={`${show === 'category' ? showButtonStyle : ''}`} onClick={() => setShow('category')}>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Categories</NavigationMenuLink>
                            </button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <button className={`${show === 'task' ? showButtonStyle : ''}`} onClick={() => setShow('task')}>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Tasks</NavigationMenuLink>
                            </button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div>
                {children}
                {
                    show === 'category' ? category : task
                }
            </div>
        </div>
    )
}