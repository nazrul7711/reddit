import nextOptions from "@/lib/auth";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    let session = await getServerSession(nextOptions);
    if (!session) {
      return NextResponse.json(
        { msg: "User is unauthenticated" },
        { status: 401 }
      );
    }
    let { postId, voteType } = await req.json();

    let existingPost = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true, 
        votes: true,
      },
    });
    if (!existingPost) {
      return NextResponse.json({ msg: "This post not found" }, { status: 404 });
    }
    let existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });


    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            id: existingVote.id,
          },
        });
        return NextResponse.json(
          { msg: "vote deleted "},
          { status: 200 }
        );
      }
      

      await db.vote.update({
        where: {
          id: existingVote?.id,
        },
        data: {
          type: voteType,
        },
      });
      let existingPostupdated = await db.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          author: true,
          votes: true,
        },
      });
      let totalCount = existingPostupdated?.votes.reduce((acc, vote) => {
        if (vote.type === "UP") {
          return acc + 1;
        } else if (vote.type === "DOWN") {
          return acc - 1;
        }
        return acc;
      }, 0);
      return NextResponse.json(
        { msg: "vote updated ", count: totalCount },
        { status: 200 }
      );
    }

    await db.vote.create({
      data: {
        userId: session.user.id,
        type: voteType,
        postId: postId,
      },
    });
    let existingPostcreated = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        votes: true,
      },
    });
    let totalCount = existingPostcreated?.votes.reduce((acc, vote) => {
      if (vote.type === "UP") {
        return acc + 1;
      } else if (vote.type === "DOWN") {
        return acc - 1;
      }
      return acc;
    }, 0);


    return NextResponse.json(
      { msg: "vote created", count: totalCount },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ msg: "Sth went wrong" }, { status: 500 });
  }
}
