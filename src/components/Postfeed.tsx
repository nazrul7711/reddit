"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ExtendedPost } from "../../db";
import { useSession } from "next-auth/react";
import Post from "./Post";

type IntersectionObserverType = IntersectionObserver | null;
const Postfeed = ({
  slugName,
  initialPosts,
}: {
  slugName: string;
  initialPosts: ExtendedPost[];
}) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [data, setData] = useState<ExtendedPost[]>([]);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        let response = await fetch(
          `/api/posts?limit=${5}&page=${pageNumber}&subredditName=${slugName}`
        );
        let { posts }:{posts:ExtendedPost[]} = await response.json();

        setData((prevData) => {
            let mergedExtendedPosts =   [...prevData, ...posts]
            let extendedMap = new Map<String,ExtendedPost>()
            mergedExtendedPosts.forEach((item)=>extendedMap.set(item.id,item))
            return Array.from(extendedMap.values())
        });

        setIsLoading(false);
        setHasMore(posts.length > 0);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    })();
  }, [pageNumber, slugName]);

  let { data: session } = useSession();
  let observerRef = useRef<IntersectionObserverType>(null);
  let lastElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((previousPage) => previousPage + 1);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore]
  );



  return (
    <div>
      <ul className="flex flex-col gap-4">
        {data &&
          data.map((post: any, index: number) => {
            const currentVote = post.votes.find(
              (vote: any) => vote.userId === session?.user.id
            );
            const votesAmt = post.votes.reduce((acc: number, vote: any) => {
              if (vote.type === "UP") return acc + 1;
              if (vote.type === "DOWN") return acc - 1;
              return acc;
            }, 0);
            if (data.length === index + 1) {
              return (
                <li ref={lastElementRef} key={index}>
                  <Post
                    post={post}
                    commentAmt={post.comments.length}
                    subredditName={post.subreddit.name}
                    votesAmt={votesAmt}
                    currentVote={currentVote}
                  />
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <Post
                    post={post}
                    commentAmt={post.comments.length}
                    subredditName={post.subreddit.name}
                    votesAmt={votesAmt}
                    currentVote={currentVote}
                  />
                </li>
              );
            }
          })}
      </ul>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
    </div>
  );
};

export default Postfeed;
