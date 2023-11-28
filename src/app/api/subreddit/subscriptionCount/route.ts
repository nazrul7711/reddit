import nextOptions from "@/lib/auth";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url= new URL(request.url);
  let slug = searchParams.get("count")



  let subscriptionCount = await db.subscription.count({
    where: {
      subreddit: {
        name: slug!
      },
    },
  });

  return NextResponse.json({ data: subscriptionCount });

}


