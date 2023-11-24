"use client"

import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";
import UserAuthForm from "./UseAuthForm";



const SignIn = () => {
  const [isSignUp,setIsSignUp]  = useState<boolean>(false)
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2 w-80 items-center ">
        <FaReddit size={50} />
        <div className="font-bold text-3xl">
          {isSignUp ? "Sign Up" : "Welcome back"}
        </div>
        <div className="text-center text-zinc-600">
          By continuing, you are setting up a Reddit account and agree to our
          User Agreement and Privacy Policy.{" "}
        </div>
        <UserAuthForm />

        <p className="text-zinc-800">
          {isSignUp ? "Already a Redditor" : "New To reddit?"}
          <button
            className="hover:text-zinc-900 underline ml-2"
            onClick={() => setIsSignUp((p) => !p)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
