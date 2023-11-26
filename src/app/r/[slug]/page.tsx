import MiniCreatePost, { MiniCreatePostProps } from "@/components/MiniCreatePost";
import nextOptions from "@/lib/auth";
import { getServerSession } from "next-auth";

import React from "react";

const Page = async ({ params }: { params: { slug: string } }) => {
  let { slug } = params;
  let session = await getServerSession(nextOptions) as MiniCreatePostProps;
  return (
    <div className="">
      <h1>r/{slug}</h1>
      {session && <MiniCreatePost session={session} />}
      <div className="grid grid-cols-3 auto-rows-[minmax(100px,auto)] gap-4">
      </div>
    </div>
  );
};

export default Page;
//find subreddit include posts include and take {notFound} next/navigation
//create some button which is client component u wanna have userouter and usePathname pass session object to it
