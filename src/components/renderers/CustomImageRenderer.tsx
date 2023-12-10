"use client"
import React from 'react'
import Image from 'next/image'

const CustomImageRenderer = ({data}:any) => {
  let url = data.file.url
  return (
    <div className="relative w-full min-h-[15rem]">
      <Image src={url} alt={"image"} className="object-contain" fill />
    </div>
  );
}

export default CustomImageRenderer