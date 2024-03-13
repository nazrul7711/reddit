import React from "react";
import Postfeed from "./Postfeed";
import { db } from "@/lib/prismaClient";

const GeneralFeed = async() => {
  let posts = await db.post.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subreddit: true,
      votes: true,
      comments: true,
      author: true,
    },
  });

  return (
    <div>
      <Postfeed initialPosts={posts} />
    </div>
  );
};

export default GeneralFeed;
