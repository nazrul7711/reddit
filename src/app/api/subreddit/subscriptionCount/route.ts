import nextOptions from "@/lib/auth";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // let {subredditId} = await request.json()
  // let count = db.subscription.count({where:{subredditId}})
  return NextResponse.json("{count}")
  // try {
  //   let session = await getServerSession(nextOptions);
  //   if (!session) {
  //     return NextResponse.json({ msg: "Unauthorised access" }, { status: 401 });
  //   }
  //   let { subredditId } = await request.json();
  //   let existingSubreddit = await db.subreddit.findFirst({
  //     where: {
  //       id: subredditId,
  //     },
  //   });
  //   // console.log(existingSubreddit)
  //   if (!existingSubreddit) {
  //     return NextResponse.json(
  //       { msg: "This user has not subscribed to this subreddit" },
  //       { status: 403 }
  //     );
  //   }
  //   let subscription = await db.subscription.findFirst({
  //     where: {
  //       subredditId,
  //     },
  //   });
  //   await db.subscription.delete({
  //     where: {
  //       id: subscription?.id,
  //     },
  //   });
  //   return NextResponse.json(
  //     { msg: "successfully unsubscribed" },
  //     { status: 200 }
  //   );
  // } catch (error) {
  //   console.log(error);
  //   return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  // }
}
