"use client";

import Image from "next/image";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { Input } from "./ui/input";
import { IoMdLink } from "react-icons/io";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { CiImageOn } from "react-icons/ci";
import { usePathname } from "next/navigation";

export type MiniCreatePostProps = {
  name: string;
  email: string;
  image: string;
  id: string;
  username: string;
};
const MiniCreatePost = ({ session }: { session: MiniCreatePostProps }) => {
  let pathname = usePathname()

  return (
    <div className="flex items-center gap-4 bg-white p-6">
      <div className="relative">
        {session.image ? (
          <Image
            src={session.image}
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
        <span className="absolute rounded-full h-3.5 w-3.5 bg-teal-400 left-8 top-6 border-2 border-white"></span>
      </div>
      <Input placeholder="Create Post" readOnly />
      <Link
        href={`${pathname}/submit`}
        className={buttonVariants({ variant: "ghost" })}
      >
        <CiImageOn size={25} />
      </Link>

      <Link
        href={`${pathname}/submit`}
        className={buttonVariants({ variant: "ghost" })}
      >
        <IoMdLink size={25} />
      </Link>
    </div>
  );
};

export default MiniCreatePost;
