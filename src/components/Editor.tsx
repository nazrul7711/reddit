"use client";
import TextareaAutosize from "react-textarea-autosize";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
// import { headers } from "next/headers";

import { app } from "@/lib/firebase";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
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
  const {
    register,
    handleSubmit,
    formState: errors,
  } = useForm<FormValues>({
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
    const getStorage = (await import("firebase/storage")).getStorage;
    const refFirebase = (await import("firebase/storage")).ref;
    const uploadBytesResumable = (await import("firebase/storage"))
      .uploadBytesResumable;
    const getDownloadURL = (await import("firebase/storage")).getDownloadURL;

    let storage = getStorage(app);

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
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const storageRef = refFirebase(storage, file.name);
                  const uploadTask = uploadBytesResumable(storageRef, file);
                  try {
                    let results = await new Promise<string>(
                      (resolve, reject) => {
                        uploadTask.on(
                          "state_changed",
                          (snapshot) => {
                            const progress =
                              (snapshot.bytesTransferred /
                                snapshot.totalBytes) *
                              100;
                            console.log("Upload is " + progress + "% done");
                            switch (snapshot.state) {
                              case "paused":
                                console.log("Upload is paused");
                                break;
                              case "running":
                                console.log("Upload is running");
                                break;
                            }
                          },
                          (error) => {
                            reject(error);
                          },
                          () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                              .then((downloadURL) => {
                                resolve(downloadURL);
                              })
                              .catch((error) => reject(error));
                          }
                        );
                      }
                    );

                    return {
                      success: 1,
                      file: {
                        url: results,
                      },
                    };
                  } catch (error) {
                    console.log(error);
                  }
                },
              },
            },
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

      _titleRef.current?.focus();
    };
    if (isMounted) {
      init();
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [initializeeditor, isMounted]);
  const { ref: titleRef, ...rest } = register("title", {
    required: "This field is required",
    minLength: {
      value: 3,
      message: "Minimum length of the text area should not be less then 3",
    },
    maxLength: {
      value: 128,
      message: "The maximum character for text area can't exceed 128",
    },
  });
  let _titleRef = useRef<HTMLTextAreaElement>(null);
  let pathName = usePathname()
  let router = useRouter()
  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    const blocks = await ref.current?.save();
    let { title } = data;
    try {
      let response = await axios.post("/api/subreddit/post/create", {
        title,
        subredditId,
        content: blocks,
      });
      if (response) {
        toast.success("post created successfully");
        let path = pathName.split("/").slice(0,-1).join("/")
        router.push(path)
        router.refresh()



      }

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast.error(error.response.data.msg);

        }
      }
    }
  };
  return (
    <div className={`${className}`}>
      <form id="textarea-form" onSubmit={handleSubmit(submitHandler)}>
        <TextareaAutosize
          {...rest}
          ref={(e) => {
            titleRef(e);
            // @ts-ignore
            _titleRef.current = e;
          }}
          className="outline-none w-full border border-gray-600 p-1"
          placeholder="Title"
        />
        <div id="editor" />
      </form>
      <Toaster />
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
