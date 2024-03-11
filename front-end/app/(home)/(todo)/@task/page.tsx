'use client'
import AddNewTaskForm from "@/components/ui/AddNewTaskForm"
import AllTasks from "@/components/ui/AllTasks"
import TodayTasks from "@/components/ui/TodayTasks"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React, { useState } from "react"

export default function TaskPage() {
    const [show, setShow] = useState('allTasks')

    const showButtonStyle = 'group inline-flex h-10 w-max items-center justify-center rounded-md bg-zinc-800 focus:text-white focus:outline-none' 
    return (
        <div className="w-full h-full">
            <div className="align-self-end">
                <div className="align-self-end">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <button className={`${show === 'allTasks' ? showButtonStyle : ''}`} onClick={() => setShow('allTasks')}>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>All</NavigationMenuLink>
                                </button>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <button className={`${show === 'todayTasks' ? showButtonStyle : ''}`} onClick={() => setShow('todayTasks')}>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Today</NavigationMenuLink>
                                </button>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <AddNewTaskForm />
            </div>
            <div>
                {
                    show === 'allTasks' ? <AllTasks/> : <TodayTasks />
                }
            </div>
        </div>
    )
}