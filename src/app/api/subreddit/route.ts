import nextOptions from "@/lib/auth";
import { db } from "@/lib/prismaClient";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//here we are taking a input from frontend and trying top create a subreddit and if subreddit is created then this user is its first subscriber
export async function POST(req: Request) {
  try {
    let session = await getServerSession(nextOptions);
    if (!session) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }
    //take user
    let { name } = await req.json();
    //if we have a subreddit then return error
    let existingSubreddit = await db.subreddit.findUnique({
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
    let currentUser = await db.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
    console.log(currentUser)
    //otherwise create a subreddit , name is unique here and creator id is the current users id
    let newSubreddit = await db.subreddit.create({
      data: {
        name,
        createdId:session.user.id,
        // creator: currentUser ,
      },
    });
    //and subreddit has subscribers and this user is the first subscriber
    await db.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: newSubreddit.id,
      },
    });
    return NextResponse.json({ name: newSubreddit.name }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "could not create Subreddit " },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  let session = await getServerSession(nextOptions);
  return NextResponse.json(session);
}
