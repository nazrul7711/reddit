import nextOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismaClient";

export async function POST(req: Request) {
  try {
    let session = await getServerSession(nextOptions);
    if (!session) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }
    let { name } = await req.json();
    let existingSubreddit = await prismaClient.subreddit.findUnique({
      where: {
        name,
      },
    });
    if (existingSubreddit) {
      return NextResponse.json(
        { error: "Subreddit with this name already exist" },
        { status: 409 }
      );
    }
    let newSubreddit = await prismaClient.subreddit.create({
      data: {
        name,
        createdId: session.user.id,
      },
    });
    await prismaClient.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: newSubreddit.id,
      },
    });
    return NextResponse.json({ name: newSubreddit.name }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "could not create Subreddit " },
      { status: 500 }
    );
  }
}


export async function GET(req:Request){
  let session = await getServerSession(nextOptions)
  return   NextResponse.json(session)

}