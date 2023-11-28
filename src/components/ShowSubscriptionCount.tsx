"use client";
import { fetchSubscribers } from "@/lib/fetcher";
import React from "react";
import useSWR from "swr";

const ShowSubscriptionCount = ({ slug }: { slug: string }) => {
  let { data, error,mutate:countMutate } = useSWR(
    ["/api/subreddit/subscriptionCount", slug],
    fetchSubscribers
  );

  if (error) {
    return <h2>error occured</h2>;
  }
  return (data && <div>{data.data}</div>);
};

export default ShowSubscriptionCount;
