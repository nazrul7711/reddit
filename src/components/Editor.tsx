"use client";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
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
      title:"",
      content:null
    },
  });
  return (
    <div className={`${className}`}>
      <form id="textarea-form">
        <TextareaAutosize
          className="outline-none w-full border border-gray-600 p-1"
          placeholder="Title"
          {...(register("title"),
          {
            required: "Title is needed",
            minLength: {
              value: 3,
              message: "Title must be longer then 3 characters",
            },
            maxLength: {
              value: 128,
              message: "Title must not exceed 128 characters",
            },
          })}
        />
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
