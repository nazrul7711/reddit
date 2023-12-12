"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { LuHome } from "react-icons/lu";

export default function Home() {
  let [name, setName] = useState("");
  return (
    <main className="flex flex-col gap-2">
      <h1>Your Feed</h1>
      <div className="flex flex-col  self-center w-2/5 space-y-2">
        <div className="text-start bg-teal-200 p-7 rounded-sm flex gap-2 items-center font-medium">
          <LuHome />
          Home
        </div>
        <p className="text-center px-3 text-gray-600">
          Your person reddit homepage.Come here to check in with your favorite
          communities.{" "}
        </p>
        <Link
          href="/r/create"
          className={buttonVariants({
            variant: "default",
            size: "span",
            className: "self-center",
          })}
        >
          Create Community
        </Link>
      </div>

      <ul>
        <li className="list-image-none hover:list-image-[url(/check.svg)]">
          one
        </li>
        <li className="list-image-none hover:list-image-[url(/check.svg)]">
          two
        </li>
        <li className="list-image-none hover:list-image-[url(/check.svg)]">
          three
        </li>
      </ul>
      <button className="text-end bg-slate-500">button</button>
      <div className="bg-purple-400 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-red-400 w-fit">
        HELLO WORLD
      </div>
      <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(400px,1fr))] auto-rows-[minmax(200px,auto)] bg-blue-200 grid-flow-row">
        <div className="col-start-2 col-span-2 bg-red-300">one</div>
        <div>two</div>
        <div>three</div>
        <div>four</div>
      </div>
      <div className="grid grid-cols-[repeat(4,1fr)] auto-rows-[minmax(100px,auto)] gap-1 grid-flow-dense ">



      </div>

      <div>{name}</div>
    </main>
  );
}
/*
started the project with npx create-next-app@latest with tailwind.

npx shadcn-ui@latest init to start with shadcn it will ask couple of question like do u want typescript yes,choose the base color slate,name the folder where nextconfig.ts files is located,css variables yes,components leave it as @components, leave utils @/lib/utils use react server components yes

then npx prisma init will generate the env file and prisma folder 

install prisma,@prisma/client @auth/prisma-adapter

declare prismadb in global.d.ts that will declare the type of prismadb in global scope

npx prisma db push is to prototype schema changes
npx prisma generate is to generate prisma client , it lets u interact with database

we add shadcn button this adds button component in ui folder 

if u wanna add button kind of style to a link then do className={buttonVariants()}

tailwind flex,items-center,justify-between,h-fit or w-fit,rounded,spin.ping,pulse,bounce,weight,size,letter-spacing,line-clamp-2,leading-2,liststyle:none,decimal,list-image-[],list-inside,how to text-align,text-decoration and text-decoration-color and text-decoration-style and text-underline-offset,text-transform,how vertical-align works and how to align vertically in tailwind,how to not do wrap,before:content-[],width:min-content and max-content and fit-content,minimum widths,clip text,how to position,display grid ,grid-template-columns,grid-auto-rows,grid-column,grid-template-columns grid-template-areas grid area,grid-column-start,grid-column-end,span 2 blocks,grid-auto-flow:column , grid-auto-flow:dense,

align-items :start now the height of the element will be determined by its content . if not start it will determined by the area of grid
align-self is for element
justify-items and justify-self for inline,place-items and place-self
align-content and justify-content if the grid-container is smaller than parent container



why use Pick<"User","name|email">

using firebase create a new project and then to find the credentials go to project settings in general tab scroll down to bottom find your apps and click </> icon to get javascript code for configuration 

now out of this make a FIREBASE in env file and api key there export app from this file

in file u wanna use firebase > let storage = getStorage(app); > const storageRef = ref(storage, 'some-child'); here instead of 'some-child' give your file name >

const uploadTask = uploadBytesResumable(
      storageRef,
      await file.arrayBuffer()
  );

let results =  await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
            do sth
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
    });

const uploadResults: string[] = (await Promise.all(result)) as string[];

also note that after u have to create storage then only data will get uploaded

403,401,400,404

do know in while making axios or fetch request pass headers:header here header comes from "next/headers"


*/

/*
use node version 20.1.0 otherwise u might face issue that backend is not supporting multiform data

when copying code for firebase use whole code like dont delete partial code like i did deleting snapshort part of the uploading function

u can write  a promise and also write await in front of it to get the file 

in prisma how to create one to many relations and what causes a cycle error and how to get rid of it

what aria-label do?


handle axios.post inside try and catch and hanlde error in catch block use error.response.status, error.response.data.error or error.response.data.data 

how to define dynamic route and dynamic paramter?

making prisma model one to one

u entered Error: (0 , swr__WEBPACK_IMPORTED_MODULE_3__.default) is not a function error why?

how will u pass data with axios.get and how do u extract params data in next backend?

if u have defined a routehandler which is dynamic then how to extract its parameter?

if u r using useSwr and want to pass data how will u do that?

u can define a button seprate from form then how to set up link between form and button?

hey explore how link got u link details in editor.js





*/

//concerns what, push back on that,enshrined, fall through that is a bummer,m saying with zero malice i mean they seam wholesome,a lawsuit revoking approval its working its way through the courts.needlessly put some through hell , finding caught in the middle of ,preemptively choose life,excerbate for people of color significant diparities,modicum of medical understanding,overwhelmingly,dereliction of duty, no inapropriate time to lament abt it,meek

//count me convinced, dangerous leaders are currently dime a dozen,to conceal his blistering chops he plays guitar to great leagth, creepy unreciprocated affection,physched about his achievement, it certifies quirky records,and to design this event and send a adjudicator they can charge anywhere between 12000 to 1/2 a million and this doesn't come cheap, confers a sense of legitimacy , reinforces a cult of personality, check all of the boxes, but then it hit me i dont need it, untenability of these two positions.beat me to the punch,sell urself short,walk all over u,slash to the bone
//outside perspective of what ails the company u name it.its ubiquitous, their reputation has taken a bit of a knock here,found itself under scruitny for everyting  for exacerbating income inequality, for all its talk , one of the disillusioned emmployee painted a pretty damninng portrait of the company ,mitigate the harm not to intensify it,cultivated a reputaion ,these lads often use a stint at mckinsey as a spingboard,good at bullshitting your way to a plaushoble sounding answer, thats emblematic of what role mcKinsy play,summed up his mission,they sold themselve with the  notion that they had special insights.some unplesant stains on its records,loudly defend your work there, how many uplifting project do u need to counterbalance feat like opiod,beyond the pale,incumbent upon us to not loose sight,end justifies the means,america has israels back,shah has modis ear,by saying these things they immediatly tap into the bigger fear,shore up its supplies

//position itself with upbeat materials,this growth has been fueled by targeting low income individuals,marginalised economically,its not one off mistake,disparity between what top execs make and rank and file do,things will quikly fall apart,it is hard to overstate the indifferecnce these chains show to their employees,set aside the thousand rodants i know its a big ask,she is giving a blank look honey not even at my lowest,i got standarts i got taste,at a rally he promised to mellow out on islamophobia,whilst i think that,what it spells for the immigrants,tar with this brush , they get to have their cake and eat it too,

//the quality of care prisoner recieve is abysmal and its woefully deficient,unsurprisingly the rosy picture u trying to paint doesn't remotely live upto reality,key reasons fo company often deliver substandard care is due to the incentive they are given,this works as incentive to cut corners, even when he was diagnsied with cancer the cabinet was dragging its feet, the whole vote is just ceremonial,given that imbalance many employers skirt the protection that workers are supposed to recieve,thats not one-off,but as frustrating as those situations can be,

//it may look unwise to talk abt technology that may as well make ur job obsolete, they asked to write songs and it gave stellar results  , my only real gripe there.the potential and perils r huge


/*
DOM ,FETCH,canvas,Service Workers,WebSockets,WebRTC ,Web Workers,MediaStream API,Stream
https://zlibrary.to/top-node.js-blueprints-books
pro node.js for developers
node cookbook

 */