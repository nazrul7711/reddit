import Link from 'next/link';
import React from 'react'
import { FaReddit } from "react-icons/fa";

const SignIn = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2 w-80 items-center ">
        <FaReddit size={50} />
        <div className='font-bold text-3xl'>Welcome back</div>
        <div className="text-center text-zinc-600">
          By continuing, you are setting up a Reddit account and agree to our
          User Agreement and Privacy Policy.{" "}
        </div>
        <p className='text-zinc-800'>New To reddit? <Link href={"/sign-up"} className="hover:text-zinc-900">Sign Up</Link></p>
      </div>

    </div>
  );
}

export default SignIn