"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Button } from "./ui/button";
import axios, { AxiosError } from "axios";
import useSwr from "swr";
import { db } from "@/lib/prismaClient";
import { fetchSubscribers } from "@/lib/fetcher";

type SubscribeLeaveToggleProps = {
  isSubscribed: boolean;
  subredditId: string;
  subredditName: string;
};

const SubscribeLeaveToggle = ({
  isSubscribed,
  subredditId,
  subredditName,
}: SubscribeLeaveToggleProps) => {
  let router = useRouter();
  let [subscribed, setSubscribed] = useState<boolean>(isSubscribed);
  let { data: subscriptionCountNew, mutate: mutateunSubscribe } = useSwr(
    "/api/subreddit/unsubscribe",
    fetchSubscribers
  );
  let { data, mutate: mutateSubscribe } = useSwr(
    "/api/subreddit/subscriptionCount",
    fetchSubscribers
  );

  async function leaveHandler() {
    try {
      const { data } = await axios.post("/api/subreddit/subscriptionCount", {
        subredditId,
      });

      if (data) {
        toast.success(data.msg);
      }
      mutateunSubscribe();
      setSubscribed(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 401 ||
          error.response?.status === 403 ||
          error.response?.status === 500
        ) {
          toast.error(error.response.data.msg);
        }
      }
    }
  }
  async function joinHandler() {
    try {
      let { data } = await axios.post("/api/subreddit/subscribe", {
        subredditId,
      });
      if (data) {
        toast.success("user subscribed successfully");
      }
      mutateSubscribe();
      setSubscribed(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 400 ||
          error.response?.status === 401 ||
          error.response?.status === 500
        ) {
          toast.error(error.response.data.msg);
        }
      }
    }
  }
  return (
    <div>
      {subscribed ? (
        <Button size="lg" className="w-full" onClick={leaveHandler}>
          Leave the community
        </Button>
      ) : (
        <Button size="lg" className="w-full" onClick={joinHandler}>
          Join the post
        </Button>
      )}
      <Toaster />
    </div>
  );
};

export default SubscribeLeaveToggle;
