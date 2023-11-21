import SignIn from "@/components/SignIn";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <Link
        href={"/"}
        className={cn(buttonVariants({ variant: "ghost" }), "mt-20")}
      >
        Home
      </Link>
      <SignIn/>
    </div>
  );
};

export default Page;
