"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const Page = () => {
  let router = useRouter();
  let inputRef = useRef<HTMLInputElement>(null);
  let [isLoading,setIsLoading] = useState<boolean>(false)
  async function createCommunityHandler() {
    try {
      setIsLoading(true)
      let res = await axios.post("/api/subreddit", {
        name: inputRef.current?.value,
      });
      if(res.status===200){
        router.push(`/r/${res.data.name}`)
      }
      
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 409 || error.response?.status===500) {
          toast.error(error.response.data.error);
        }
        
      }
    }
  }
  return (
    <div className="w-3/5 mx-auto p-4 bg-white space-y-3">
      <div className="font-bold text-2xl">Create a community</div>
      <hr />
      <div className="font-medium text-gray-700 text-lg">Name</div>
      <div className="text-gray-500 font-medium text-md">
        Community names including capitalization cannot be changed
      </div>
      <Input type="text" placeholder="r/" ref={inputRef} />
      <div className="space-x-2">
        <Button
          variant="outline"
          className="bg-gray-200"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button onClick={createCommunityHandler}>
          {isLoading && <ImSpinner2 className="animate-spin"/>}
          Create Community</Button>
      </div>
      <Toaster />
    </div>
  );
};

export default Page;
