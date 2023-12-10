"use client"
import React, { Suspense } from 'react'
import {lazy} from "react"
import CustomCodeRenderer from './renderers/CustomCodeRenderer'
import CustomImageRenderer from './renderers/CustomImageRenderer'

const Output = lazy(()=>import("editorjs-react-renderer"))

type EditorOutputProps = {
  content:any
}
const renderers ={
  image:CustomImageRenderer,
  code:CustomCodeRenderer
}
const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const EditorOutput = ({content}:EditorOutputProps) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Output data={content} renderers={renderers} style={style}/>
      </Suspense>

    </div>
  )
}

export default EditorOutput