import { AuthOptions } from "next-auth";
import {db} from "./prismaClient";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { nanoid } from "nanoid";

const nextOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (!dbUser) {
        token.id = user!.id;
        return token;
      }
      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: nanoid(10),
          },
        });
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      };
    },
    redirect() {
      return "/";
    },
  },
};

export default nextOptions;

// function liveDangerously(x ?: number | null) {
//   // No error
//   console.log(x!.toFixed());
// }

// whats wrong in here and possible workaround
// declare function handleRequest(url: string, method: "GET" | "POST"): void;

// const req = { url: "https://example.com", method: "GET" }as const ;
// handleRequest(req.url, req.method );

// function hello(a:()=>void){
//   if(typeof a==='function'){
//     console.log("hello janki")
//   }
// }

// hello(()=>console.log("sunita"))

/*
number, string ,boolean, number[] Array<number>, tuple [number,string],
function hello():number{}
function hello():Promise<number>{}
function hello(s:{a:string}):Promise<number>{}
union type
type aliases
how to extend type of interface and type
can u change a type after being created?
how to do type assertions?
const x = "hello" as number; will this work?
litral types and its use?
can u combine literal with non litral types?
what is stictnullcheck
for truthy will work for ""
narrowing typeof , truthy, && ,===,"litral" in value,instanceof,
type predicate ,
discrimante union , never
call signature
construct signature
generic function
function overload
unknown type
readOnly properties
index signatures




*/