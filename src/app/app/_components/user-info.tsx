'use client'

import { Avatar,AvatarFallback  } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

type Props = {
  user: Session['user']
}

export function UserInfo({ user }: Props) {

  if (!user) return;
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Avatar>

        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <span>{user?.email}</span>

      <Button onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>

  )
}