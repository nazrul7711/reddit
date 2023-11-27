import nextOptions from "@/lib/auth";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//for subscribing to a reddit
export async function POST(req: Request) {
  try {
    const session = await getServerSession(nextOptions);

    if (!session) {
      return NextResponse.json({ msg: "Unauthorised access" }, { status: 401 });
    }

    const { subredditId } = await req.json();


    // check if user has already subscribed to subreddit
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });


    if (subscriptionExists) {
      return NextResponse.json(
        { msg: "You've already subscribed to this subreddit" },
        {
          status: 400,
        }
      );
    }

    // create subreddit and associate it with the user
    await db.subscription.create({
      data: {
        subredditId,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ subredditId });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        msg: "Could not subscribe to subreddit at this time. Please try later",
      },
      { status: 500 }
    );
  }
}
