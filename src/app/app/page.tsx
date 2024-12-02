import { auth } from "@/service/auth";
import { UserInfo } from "./_components/user-info";

export default async function PageHome() {
  const session = await auth()
  return (
    <main className="flex justify-center items-center h-screen">
      <UserInfo user={session?.user}/>
    </main>
  )
}