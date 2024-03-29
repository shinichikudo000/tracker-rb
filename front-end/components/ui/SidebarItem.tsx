import { useUserStore } from "@/app/_helper-functions/store";
import Link from "next/link";
import { IconType } from "react-icons"
import { twMerge } from "tailwind-merge";

export default function SidebarItem({
    icon: Icon,
    label,
    active,
    href
}: {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string
}) {
    const handleLogout = () => {
        useUserStore.setState((prevState) => ({
            ...prevState,
            token: null,
            refresh_token: null,
            resource_owner: null
        }))
    }
    // async function handleLogout() {
    //     try {
    //         const res = await
    //         if(res.ok) {
    //             useUserStore.setState((prevState) => ({
    //                 ...prevState,
    //                 token: null,
    //                 refresh_token: null,
    //                 resource_owner: null
    //             }))
    //         } else {
                
    //         }
    //     } catch(e) {
    //         console.log(e)
    //     }
    // }
    return (
        <Link href={href} onClick={label === 'Log Out' ? handleLogout : undefined} className={twMerge(`
            flex
            flex-row
            h-auto
            items-center
            w-full
            gap-x-4
            text-md
            font-medium
            cursor-pointer
            hover:text-white
            transition
            text-neutral-400
            py-1
        `, active && "text-white"
        )}>
            <Icon size={26} />
            <p className='truncate w-full'>{label}</p>
        </Link>
    )
}