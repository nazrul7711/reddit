import { AuthOptions } from "next-auth";
import prismaClient from "./prismaClient"
import { PrismaAdapter } from "@auth/prisma-adapter";


const authOptions:AuthOptions = {
  adapter:PrismaAdapter(prismaClient),
  providers:[]

}