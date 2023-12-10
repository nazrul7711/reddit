import { db } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);
    let kill = new URL(request.url);
    let subredditName = searchParams.get("subredditName");
    let userEmail = searchParams.get("email");
    if (!subredditName || !userEmail) {
      return NextResponse.json(
        { msg: "reddit name or email is missing in request" },
        { status: 400 }
      );
    }
    let response = await db.subscription.findFirst({
      where: {
        subreddit: {
          name: subredditName,
        },
        user: {
          email: userEmail,
        },
      },
    });

    return NextResponse.json({ msg: "subscribed " }, { status: 200 });  
  } catch (error) {
    return NextResponse.json({ msg: "sth went wrong" }, { status: 500 });
  }
}
