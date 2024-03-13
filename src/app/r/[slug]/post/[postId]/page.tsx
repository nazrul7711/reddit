import EditorOutput from "@/components/EditorOutput";
import { db } from "@/lib/prismaClient";
import React from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

type SubRedditPostProps = {
  params: {
    postId: string;
  };
};

const SubRedditPostPage = async ({ params }: SubRedditPostProps) => {
  let post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
    include: {
      author: true,
    },
  });

  return (
    <div className="flex items-center gap-5">
      <div className="flex flex-col justify-center items-center max-w-max p-3 gap-2 ">
        <BiUpvote   />
        <div >{0}</div>
        <BiDownvote  />
      </div>
      <div className="bg-white rounded-md w-full p-4 space-y-2">
        <p>Posted by u/{post?.author.username}</p>
        <div className="text-lg font-semibold">{post?.title}</div>
        <EditorOutput content={post?.content} />
      </div>
    </div>
  );
};

export default SubRedditPostPage;

// cachedPost is of type
// id: string
//   title: string
//   authorUsername: string
//   content: string
//   currentVote: Vote['type'] | null
//   createdAt: Date
