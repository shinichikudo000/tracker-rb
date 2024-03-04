import Box from "@/components/ui/Box"
import Sidebar from "@/components/ui/Sidebar"
import React from "react"

export default function HomeLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section className='w-full h-full flex gap-2 py-[5rem] px-[10rem] font-header text-[2rem]'>
            <Sidebar />
            <Box className='
                w-full 
                h-full 
                flex
                flex-col
                p-4
                overflow-x-hidden
            '>
                <div className="
                    text-4xl
                    flex
                    w-full
                    justify-center
                    border-b-4
                    border-[#282828]
                    pb-4
                ">
                    Task Tracker
                </div>
                <div>
                    {children}
                </div>
            </Box>
        </section>
    )
}