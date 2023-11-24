import React from "react";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth";
import nextOptions from "@/lib/auth";
import DropDownMenu from "./DropdownMenu";

const Navbar = async () => {

  let session = await getServerSession(nextOptions);
  return (
    <div className="fixed inset-0 top-0 bg-zinc-100 border-b-1 border-zinc-200 h-fit">
      <div className="flex justify-between px-8 py-4 items-center">
        <Link href={"/"} className="flex items-center gap-2">
          <FaReddit size={35} />
          <p className="font-medium text-xl">Reddit</p>
        </Link>
        {session ? (
          <div><DropDownMenu user={session.user}/></div>
        ) : (
          <Link href={"/sign-in"} className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
