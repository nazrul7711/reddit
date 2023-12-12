import { Post, User, Vote } from "@prisma/client";
import React, { useRef } from "react";
import { MdInsertComment } from "react-icons/md";
import EditorOutput from "./EditorOutput";
import PostVoteClient from "./post-vote/PostVoteClient";

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

const Post = ({ subredditName, post, commentAmt,votesAmt:_votesAmt ,currentVote:_currentVote}: PostProp) => {
  let editoroutputRef = useRef<HTMLDivElement>(null);
  
  function timeDiff(time:Date){
    let postTime = new Date(time).getTime()
    let currentTime = new Date().getTime()
    let hour = (currentTime - postTime)/(1000*60*60)
    if(hour>24){
      return `${Math.ceil(hour/24)} days`
    }
    if(hour<1){
      return `${Math.ceil(hour)} mins`
    }
    return `${Math.floor(hour)} hr`;

  }

  return (
    <div className="p-4 shadow rounded-md">
      <div className="flex space-x-3 items-center">
        <PostVoteClient initialVotesAmt={_votesAmt} postId = {post.id} initialVote={_currentVote?.type} />
        {subredditName && (
          <div className="underline underline-offset-2">
            <a href={`/r/${subredditName}`}>r/{subredditName}</a>
          </div>
        )}
        <div className="flex items-center space-x-1">
          {" "}
          <span className="inline-block h-2 w-2 rounded bg-slate-500"></span>
          <div className="text-slate-500">Posted by {post.author.username}</div>
          <span>{timeDiff(post.createdAt)} ago</span>
        </div>
      </div>
      <div className="mt-1 text-lg font-semibold">{post.title}</div>
      <div
        className="relative overflow-clip w-full max-h-40"
        ref={editoroutputRef}
      >
        <EditorOutput content={post.content} />
        {editoroutputRef.current?.clientHeight! > 20 ? (
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

//postvodeclient