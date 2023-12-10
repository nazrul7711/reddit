import { Post, User, Vote } from "@prisma/client";
import React, { useEffect, useRef } from "react";
import { MdInsertComment } from "react-icons/md";
import EditorOutput from "./EditorOutput";

type PostProp = {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  commentAmt: number;
  subredditName: string;
  votesAmt: number;
  currentVote: Pick<Vote, "type">;
};

const Post = ({ subredditName, post, commentAmt }: PostProp) => {
  let editoroutputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(editoroutputRef.current?.clientHeight, "kill");
  }, []);
  return (
    <div className="p-4">
      <div className="flex space-x-3 items-center">
        {subredditName && (
          <div className="underline underline-offset-2">
            <a href={`/r/${subredditName}`}></a>r/{subredditName}
          </div>
        )}
        <div className="flex items-center space-x-1">
          {" "}
          <span className="inline-block h-2 w-2 rounded bg-slate-500"></span>
          <div className="text-slate-500">Posted by {post.author.username}</div>
        </div>
      </div>
      <div className="mt-1 text-lg font-semibold">{post.title}</div>
      <div
        className="relative overflow-clip w-full max-h-40"
        ref={editoroutputRef}
      >
        <EditorOutput content={post.content} />
        {editoroutputRef.current?.clientHeight > 20 ? (
          <div className="absolute left-0 bottom-0 h-[10rem] bg-gradient-to-t from-white to-transparent w-full"></div>
        ) : null}
      </div>

      <div className="flex items-center justify-start space-x-3 mt-6">
        <MdInsertComment />
        <div>{commentAmt} comments</div>
      </div>
    </div>
  );
};

export default Post;
