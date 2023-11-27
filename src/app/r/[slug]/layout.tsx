import { MiniCreatePostProps } from "@/components/MiniCreatePost";
import nextOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { db } from "@/lib/prismaClient";
import { notFound } from "next/navigation";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import useSwr from "swr";
import axios from "axios";

const SlugLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  let { slug } = params;
  let session = await getServerSession(nextOptions);

  //in layout we find subreddit with the slug in the subreddit we find all the posts and in those posts we find votes to each posts and its author(user)
  let subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          votes: true,
          author: true,
        },
      },
    },
  });

  //if we have a session find subscription where we have this subreddit and current user
  let subscription = session
    ? await db.subscription.findFirst({
        where: {
          subreddit: {
            name: slug,
          },
          user: {
            email: session.user.email,
          },
        },
      })
    : undefined;

  const isSubscribed = !!subscription;
  //of course if no subreddit with this slug then return not found
  if (!subreddit) return notFound();
  //count subscribers with this subreddit
  // let subscriptionCount = await db.subscription.count({
  //   where: {
  //     subreddit: {
  //       name: slug,
  //     },
  //   },
  // });
  // let subscriptionCount = await axios.get("/api/subreddit/subscriptionCount")
  
  let currentUser = await db.user.findFirst({
    where: { email: session?.user.email },
  });

  let subredditDate = subreddit?.createdAt.toLocaleDateString().split("/");

  let date =
    subredditDate &&
    new Date(`${subredditDate[2]}-${subredditDate[0]}-${subredditDate[1]}`);
  let options = { month: "long", day: "numeric", year: "numeric" };
  let newDate = date?.toLocaleDateString("en-US", options);
  // console.log(session.id, "nano");
  return (
    <div className="grid grid-cols-9 gap-4">
      <div className="col-start-1 col-end-7">{children}</div>
      {/* information sidebar */}
      <div className="col-start-7 col-end-10 bg-teal-300 hidden sm:block">
        <h2>About r/{slug}</h2>
        <div className="bg-white flex flex-col gap-5 p-6 text-zinc-500">
          <div className="flex justify-between  bg-white">
            <h1 className="text-gray-500">Created</h1>
            <span className="text-zinc-800">{newDate}</span>
          </div>
          <div className="flex justify-between">
            Members <span>{43}</span>
          </div>
          {/* if the creator of this subreddit and current user are same */}

          {subreddit.createdId === session?.user.id ? (
            <div className="w-3/5">you created this community</div>
          ) : null}
          {/* subreddit.createdId !== session?.user.id  */}
          {true ? (
            <SubscribeLeaveToggle
              isSubscribed
              subredditId={subreddit.id}
              subredditName={slug}
            />
          ) : null}
          <Link
            href={`r/${slug}/submit`}
            className={buttonVariants({
              variant: "outline",
              className: "w-full",
            })}
          >
            Create Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SlugLayout;

/*
subreddit with posts where we have author and votes details const subreddit = await db.subreddit.findFirst({
  where: { name: slug },
  include: {
    posts: {
      include: {
        author: true,
        votes: true,
      },
    },
  },
});
*/
