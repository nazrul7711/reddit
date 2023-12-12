import nextOptions from "@/lib/auth";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let data = await request.json();
  let { title, content, subredditId } = data;
  let session = await getServerSession(nextOptions);

  if (!session) {
    return NextResponse.json({ msg: "User unauthenticated" }, { status: 401 });
  }
  //to see that the user and this subreddit belongs
  let isUserSubscribed = await db.subscription.findFirst({
    where: {
      subredditId,
      userId: session.user.id,
    },
  });
  if (!isUserSubscribed) {
    return NextResponse.json(
      { msg: "This subreddit does not belong to this user" },
      { status: 403 }
    );
  }
  await db.post.create({
    data: {
      title,
      content,
      authorId: session.user.id,
      subredditId,
    },
  });

  return NextResponse.json({ msg: "ok" }, { status: 200 });
}
