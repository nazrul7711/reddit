import Editor from '@/components/Editor'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/prismaClient'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({params}:{params:{slug:string}}) => {

  let subreddit = await db.subreddit.findFirst({where:{
    name:params.slug
  }})
  if(!subreddit){
    return notFound()
  }

  return (
    <div className='flex flex-col '> 
      <div className='flex gap-2 items-center'>
        <h2 className='font-semibold text-lg'>Create Post</h2>
        <p className='text-gray-400'>in r/{params.slug}</p>
      </div>
      <Editor className="self-center w-4/5" subredditId={subreddit.id}/>
      <Button form='textarea-form' type='submit' className='w-4/5 self-center'>Post</Button>
    </div>
  )
}

export default Page