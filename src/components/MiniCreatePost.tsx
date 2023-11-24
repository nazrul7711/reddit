"use client"
import { Session } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { FaUserAlt } from 'react-icons/fa'

type MiniCreatePostProps = {
  name:string,
  email:string,
  image:string,
  id:string,
  username:string
}
const MiniCreatePost = ({session}:{session:MiniCreatePostProps}) => {
  return (
    <div className="flex">
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
    </div>
  );
}

export default MiniCreatePost