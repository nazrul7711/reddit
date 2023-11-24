"use client"
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const Session = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Session;
