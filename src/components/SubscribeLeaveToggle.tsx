"use client"
import { useRouter } from 'next/router'
import React from 'react'
import {  toast } from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

type SubscribeLeaveToggleProps = {
  isSubscribed:boolean
  subredditId:string
  subredditName:string
}

const SubscribeLeaveToggle = ({isSubscribed}:SubscribeLeaveToggleProps) => {
  let router = useRouter()
  return (
    <div>
      <Toaster/>
    </div>
  )
}

export default SubscribeLeaveToggle