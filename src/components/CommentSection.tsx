import { db } from '@/lib/prismaClient'
import React from 'react'

type CommentSectionProps={
  postId:string
}

const CommentSection = async({postId}:CommentSectionProps) => {
  let comments = await db.comment.findMany({
    where:{
      postId,
      replyToId:null
    },
    include:{
      author:true,
      votes:true,
      replies:{
        include:{
          author:true,
          votes:true
        }
      }
    }

  })
  return (
    <div>


    </div>
  )
}

export default CommentSection