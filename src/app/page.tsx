import { authOptions } from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import { signOut } from "next-auth/react"

import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)
  if(!session){
    return redirect("/auth/signin?callbackUrl=/")
  }
if (session && session.expires && Number(session.expires) < Date.now()) {
  await signOut();
}
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        This is a protected page
        </div>
    </main>
  )
}


