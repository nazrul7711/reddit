import React from "react";
import Postfeed from "./Postfeed";
import { useSession } from "next-auth/react";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import nextOptions from "@/lib/auth";

const CustomFeed = async () => {
  const session = await getServerSession(nextOptions);
  const communitiesFollowed = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      subreddit: true,
    },
  });


  const posts = await db.post.findMany({
    where: {
      subredditId: {
        in: communitiesFollowed.map((subreddit) => subreddit.subredditId),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      comments: true,
      votes: true,
      subreddit: true,
    },
    take:2
  });
  return (
    <div>
      <Postfeed initialPosts={posts} />
    </div>
  );
};

export default CustomFeed;
