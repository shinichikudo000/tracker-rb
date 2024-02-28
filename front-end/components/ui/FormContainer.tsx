import React from "react"

export default function FormContainer({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-[500px] h-[500px] border-2 rounded-lg p-4 border-primary">
                {children}
            </div>
        </section>
    )
}