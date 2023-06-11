'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from "next/navigation"

interface Props {
    
}

const page: React.FC<Props> = () => {
    const session = useSession()
    if(!session || session.status == 'unauthenticated'){
        return redirect("/auth/signin?callbackUrl=/clientProtected")
    }
    console.log(session)

    return (
        <div>
            Client protected page
        </div>
    )
}

export default page
