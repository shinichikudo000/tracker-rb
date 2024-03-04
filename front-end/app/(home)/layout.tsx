'use client'
import Box from "@/components/ui/Box";
import Sidebar from "@/components/ui/Sidebar";
import React, { useEffect } from "react";
import { useUserStore } from "../_helper-functions/store";
import { useRouter } from "next/navigation";

export default function HomeLayout({
    children
}: {
    children: React.ReactNode
}) {
    const token = useUserStore((state) => state.token);
    const router = useRouter();

    useEffect(() => {
        if (token === null) {
            router.replace('/sign-in');
        }
    }, [token, router]);

    return (
        token !== null && (
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
    );
}