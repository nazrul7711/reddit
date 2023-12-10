"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Button } from "./ui/button";
import axios, { AxiosError } from "axios";
import useSWR from "swr";
import { fetchSubscribers } from "@/lib/fetcher";
import { db } from "@/lib/prismaClient";
import { useSession } from "next-auth/react";

type SubscribeLeaveToggleProps = {
  subredditId: string;
  subredditName: string;
};

const SubscribeLeaveToggle = ({
  subredditId,
  subredditName,
}: SubscribeLeaveToggleProps) => {
  let [isSubscribed, setIsSubscribed] = useState(false);
  let { data } = useSession();
  let email = data?.user.email

  useEffect(() => {
    (async () => {
      let response = await axios.get(`/api/subreddit/isSubscribed?subredditName=${subredditName}&email=${email}`);
      if (response) {
        setIsSubscribed(true);
      }
    })();
  }, [email]);
  let [subscribed, setSubscribed] = useState<boolean>(isSubscribed);
  let { mutate: countMutate } = useSWR(
    ["/api/subreddit/subscriptionCount", subredditName],
    fetchSubscribers
  );

  async function leaveHandler() {
    try {
      const { data } = await axios.post("/api/subreddit/unsubscribe", {
        subredditId,
      });

      if (data) {
        toast.success(data.msg);
      }
      countMutate();
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
      countMutate();
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
