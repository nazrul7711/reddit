import nextOptions from "@/lib/auth";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let url = new URL(req.url);
  let subredditName = url.searchParams.get("subredditName");
  let limit = url.searchParams.get("limit");
  let page = url.searchParams.get("page");
  const session = await getServerSession(nextOptions);
  let communityIds: string[] = [];
  if (!session) {
    return NextResponse.json(
      { msg: "user is unauthenticated" },
      { status: 403 }
    );
  }
  //take out all subscription where i have this user id and subreddits in them
  let subscriptions = await db.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      subreddit: true,
    },
  });
  let subredditIds = subscriptions.map((sub) => sub.subreddit.id);
  try {
    let whereClause = {};

    if (subredditName) {
      whereClause = {
        subreddit: {
          name: subredditName,
        },
      };
    } else if (session) {
      whereClause = {
        subreddit: {
          id: {
            in: subredditIds,
          },
        },
      };
    }
    const posts = await db.post.findMany({
      take: parseInt(limit!),
      skip: (parseInt(page!) - 1) * parseInt(limit!),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subreddit: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    });
    
    
    


    console.log(subredditName, posts);
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "sth went wrong" }, { status: 500 });
  }
}
