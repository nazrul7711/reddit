"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ExtendedPost } from "../../db";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import Post from "./Post";


const Postfeed = ({
  slugName,
  initialPosts,
}: {
  slugName: string;
  initialPosts: ExtendedPost[];
}) => {
  useEffect(() => {
    // let observer = new IntersectionObserver((entries) => {
    //   entries.map((x) => {
    //     if (x.isIntersecting) {
    //       console.log("yesssss");
    //     } else {
    //       console.log("nooooo");
    //     }
    //   });
    // });
    // observer.observe(firstRef.current!);
  }, []);
  console.log(initialPosts);

  let { data, error, isLoading } = useSWR(
    `/api/posts?limit=${5}&page=${1}&subredditName=${slugName}`,
    fetcher
  );
  console.log(data);
  let { data: session } = useSession();

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {data &&
          data.posts.map((post:any, index:number) => {
            const currentVote = post.votes.find(
              (vote: any) => vote.userId === session?.user.id
            );
            const votesAmt = post.votes.reduce((acc, vote ) => {
              if (vote.type === "UP") return acc + 1;
              if (vote.type === "DOWN") return acc - 1;
              return acc;
            }, 0);
            return (
              <li>
                <Post
                  post={post}
                  commentAmt={post.comments.length}
                  subredditName={post.subreddit.name}
                  votesAmt={votesAmt}
                  currentVote={currentVote}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Postfeed;
//this takes initialPosts and surredditName:string  initalPosts:ExtendedPost[] and extendedPost is of type Post & {subreddit:Subreddit, votes:Vote[],author:User,comments:Comment[]}
