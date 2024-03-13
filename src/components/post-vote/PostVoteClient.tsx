"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { VoteType } from "@prisma/client";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BiSolidUpvote } from "react-icons/bi";

type PostVoteClientProps = {
  initialVotesAmt: number;
  initialVote?: VoteType | null;
  postId: string;
};

const PostVoteClient = ({
  initialVotesAmt,
  initialVote,
  postId,
}: PostVoteClientProps) => {
  let [votesAmount, setVotesAmount] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  async function upvoteHandler() {
    let payload = {
      voteType: "UP",
      postId,
    };
    try {
      let res = await axios.patch("/api/subreddit/post/vote", payload);
      if (res.status === 200) {
        console.log(res.data);
        setVotesAmount(res.data.count);
        toast.success(res.data.msg);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.msg);
      }
    }
  }
  async function downvoteHandler() {
    let payload = {
      voteType: "DOWN",
      postId,
    };
    try {
      let res = await axios.patch("/api/subreddit/post/vote", payload);
      if (res.status === 200) {
        setVotesAmount(res.data.count);
        toast.success(res.data.msg);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.msg);
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={upvoteHandler}
        variant={"ghost"}
        size="sm"
        aria-label="upvote"
      >
        <BiUpvote />
      </Button>
      <p>{votesAmount}</p>
      <Button
        onClick={downvoteHandler}
        variant={"ghost"}
        size="sm"
        aria-label="upvote"
      >
        <BiDownvote />
      </Button>
      <Toaster />
    </div>
  );
};

export default PostVoteClient;
