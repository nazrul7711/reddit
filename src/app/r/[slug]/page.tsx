import MiniCreatePost, {
  MiniCreatePostProps,
} from "@/components/MiniCreatePost";
import Postfeed from "@/components/Postfeed";
import nextOptions from "@/lib/auth";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import React from "react";
export const INFINITE_SCROLL_PAGINATION_RESULTS = 2;
const Page = async ({ params }: { params: { slug: string } }) => {
  let { slug } = params;
  let session = (await getServerSession(nextOptions)) as MiniCreatePostProps;

  //it means to find subreddit and in there include all the posts
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          comments: true,
          votes: true,
          subreddit: true,
        },
        orderBy:{
          createdAt:"desc"
        },
        take:INFINITE_SCROLL_PAGINATION_RESULTS 
      },
      
    },
    
  });
  if(!subreddit){
    return notFound()
  }
  console.log(subreddit.posts)

  return (
    <div className="">
      <h1>r/{slug}</h1>
      {session && <MiniCreatePost session={session} />}
      <div className="grid grid-cols-3 auto-rows-[minmax(100px,auto)] gap-4"></div>

      {subreddit.posts && <Postfeed slugName={slug} initialPosts={subreddit.posts}/>}
    </div>
  );
};

export default Page;
//find subreddit include posts include and take {notFound} next/navigation
//create some button which is client component u wanna have userouter and usePathname pass session object to it



/**
 posts: ({
        subreddit: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            createdId: string | null;
        };
        author: {
            id: string;
            name: string | null;
            email: string | null;
            ... 8 more ...;
            subscriptionId: string | null;
        } | null;
        comments: {
            ...;
        }[];
        votes: {
            ...;
        }[];
    } & {
        ...;
    })[];
} & {
    ...;
}) | null

 */