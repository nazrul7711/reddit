"use client"
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";

type DropdownMenuProps = {
  user: Pick<User, "name" | "email" | "image">;
};

const DropDownMenu = ({ user }: DropdownMenuProps) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          {user.image ? (
            <Image
              src={user.image}
              height={30}
              width={30}
              alt="user"
              className="rounded-full"
            />
          ) : (
            <FaUserAlt
              size={30}
              className="h-10 w-10 rounded-full bg-slate-300 p-2"
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-5 ">
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <span className="text-xs pl-2">{user.email}</span>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Feed</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/r/create">Create Community</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings"> Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signOut()}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownMenu;
