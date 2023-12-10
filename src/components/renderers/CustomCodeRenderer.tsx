"use client"
import React from 'react'

const CustomCodeRenderer = ({data}:{data:any}) => {
  return (
    <div>
      <code>{data}</code>
    </div>
  )
}

export default CustomCodeRenderer