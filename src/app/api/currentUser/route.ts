import { MiniCreatePostProps } from "@/components/MiniCreatePost"
import nextOptions from "@/lib/auth"
import { db } from "@/lib/prismaClient"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req:Request){
  let session = await getServerSession(nextOptions) as MiniCreatePostProps
  let currentUser = await db.user.findFirst({
    where:{
      email:session.email
    }
  })
  return NextResponse.json({data:currentUser})
}