"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LuLoader2 } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const UserAuthForm = () => {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  async function googleHandler() {
    try {
      setIsLoading(true)
      await signIn("google")
      setIsLoading(false)

    } catch {
      toast.error("Sign in didn't work")
    }
  }
  return (
    <div>
      <Button onClick={googleHandler} isLoading={isLoading} size="lg" className="flex gap-2">
        {isLoading ? <LuLoader2 className="animate-spin" /> : null}
        {!isLoading && <FcGoogle/> }
        Google
      </Button>
      <Toaster/>
    </div>
  );
};

export default UserAuthForm;
