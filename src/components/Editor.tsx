"use client";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
type FormValues = {
  title: string;
  subredditId: string;
  content: any;
};

const Editor = ({
  className,
  subredditId,
}: {
  className: string;
  subredditId: string;
}) => {
  const { register } = useForm<FormValues>({
    defaultValues: {
      subredditId,
      title: "",
      content: null,
    },
  });
  let ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  let initializeeditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        //it means id of the div where editorjs will be displayed
        holder: "editor",

        onReady() {
          ref.current = editor;
        },

        placeholder: "Type here to write your post...",
        //if u select the text it will show a mini toolbar
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config:{
              uploader:{
                async uploadByFile(file:File){
                  
                }
              }
            }
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeeditor();
      setTimeout(() => {});
    };
    if (isMounted) {
      init();
      return () => {};
    }
  }, [initializeeditor, isMounted]);
  return (
    <div className={`${className}`}>
      <form id="textarea-form">
        <TextareaAutosize
          className="outline-none w-full border border-gray-600 p-1"
          placeholder="Title"
          {...(register("title"),
          {
            // required: "Title is needed",
            // minLength: {
            //   value: 3,
            //   message: "Title must be longer then 3 characters",
            // },
            // maxLength: {
            //   value: 128,
            //   message: "Title must not exceed 128 characters",
            // },
          })}
        />
        <div id="editor" />
      </form>
    </div>
  );
};

export default Editor;

/*
let {register,handleSubmit,formState:{errors},watch}  = useForm<>({defaultValues:{
  firstname:"bill"
}})
errors.firstname.message
watch("firstname")
onsubmit={handleSubmit((data)=>{console.log(data)})}
<input {...register("firstname",{required:"this is needed",minLength:{value:3,message:"this is minimum"}})}
validate:(value)=>value==="bill"
*/
