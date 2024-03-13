import CustomFeed from "@/components/CustomFeed";
import GeneralFeed from "@/components/GeneralFeed";
import { buttonVariants } from "@/components/ui/button";
import nextOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { LuHome } from "react-icons/lu";

export default async function Home() {
  let session = await getServerSession(nextOptions);

  return (
    <main className="flex flex-col gap-2">
      <h1>Your Feed</h1>
      <div className="flex gap-3">
        <div className="flex-[2]">
          {session ? <CustomFeed /> : <GeneralFeed />}
        </div>
        <div className=" flex flex-col  w-2/5 space-y-2">
          <div className=" bg-teal-200 p-7 rounded-sm flex gap-2  font-medium">
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
      </div>

      <ul>
        <li className="list-image-none hover:list-image-[url(/check.svg)]">
          one
        </li>
      </ul>
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

how to attach dynamic refs

how to use useEffect so that when axios fetches only the latest url based upon input getting from input element onChange 

how to use intersectionObeserver api

how to create Map in typescript

how to create infinite scrolling

if u have arr where u want to deconstruture two array that are array of complex objects and they may contain duplicate elements how to create this array unique






*/

//push back on that,enshrined, fall through that is a bummer,m saying with zero malice i mean they seam wholesome,a lawsuit revoking approval its working its way through the courts.needlessly put some through hell , finding caught in the middle of ,preemptively choose life,excerbate for people of color significant diparities,modicum of medical understanding,overwhelmingly,dereliction of duty, no inapropriate time to lament abt it,meek

//count me convinced, dangerous leaders are currently dime a dozen,to conceal his blistering chops he plays guitar to great leagth, confers a sense of legitimacy , reinforces a cult of personality, check all of the boxes, but then it hit me i dont need it, untenability of these two positions.beat me to the punch,sell urself short,walk all over u,slash to the bone

//these lawsuits are scourge,they bent over backwards to standout ,

//outside perspective of what ails the company u name it.its ubiquitous, their reputation has taken a bit of a knock here,found itself under scruitny for everyting  for exacerbating income inequality, for all its talk , one of the disillusioned emmployee painted a pretty damninng portrait of the company ,mitigate the harm not to intensify it,cultivated a reputaion ,these lads often use a stint at mckinsey as a spingboard,good at bullshitting your way to a plaushoble sounding answer, thats emblematic of what role mcKinsy play,summed up his mission,they sold themselve with the  notion that they had special insights.some unplesant stains on its records,loudly defend your work there, how many uplifting project do u need to counterbalance feat like opiod,beyond the pale,incumbent upon us to not loose sight,end justifies the means,america has israels back,shah has modis ear,by saying these things they immediatly tap into the bigger fear,shore up its supplies

//position itself with upbeat materials,this growth has been fueled by targeting low income individuals,marginalised economically,its not one off mistake,disparity between what top execs make and rank and file do,things will quikly fall apart,it is hard to overstate the indifferecnce these chains show to their employees,set aside the thousand rodants i know its a big ask,she is giving a blank look honey not even at my lowest,i got standarts i got taste,at a rally he promised to mellow out on islamophobia,whilst i think that,what it spells for the immigrants,tar with this brush , they get to have their cake and eat it too,

//the quality of care prisoner recieve is abysmal and its woefully deficient,unsurprisingly the rosy picture u trying to paint doesn't remotely live upto reality,key reasons fo company often deliver substandard care is due to the incentive they are given,this works as incentive to cut corners, even when he was diagnsied with cancer the cabinet was dragging its feet, the whole vote is just ceremonial,given that imbalance many employers skirt the protection that workers are supposed to recieve,thats not one-off,but as frustrating as those situations can be,

//it may look unwise to talk abt technology that may as well make ur job obsolete, they asked to write songs and it gave stellar results  , my only real gripe there.the potential and perils r huge

/*
DOM ,FETCH,canvas,Service Workers,WebSockets,WebRTC ,Web Workers,MediaStream API,Stream
https://zlibrary.to/top-node.js-blueprints-books
pro node.js for developers
node cookbook



digital
reason
ordinary
pact
quiz
raw
agree
property
comic
blossom
bottom
truly





sign adult seed top coconut negative runway clay submit usage payment tumble
 */

/*
  <video src={} width={} height={} controls muted poster="/posterpath"> </video>
  css video{border-radius,border,object-fit}
  u can use these styles for iframe which is used for showing utube
  use videojs for customizing videos
  section.hero>container>header>logo,navbar.
  give video z-index:-2
  also make hero :before witha background little transfer
  use handbrake to convert a mp4 to webm video
  u can also use <source src="srcpath" type="video/mp4"> use source to give 2 src in case browser does not support one it will use the second
  1080 resolution is ok
  TRANSITION
  if u have hover animation then apply transition to main element transition-property,transition-duration
  if u wanna apply same transition function and duration to couple of transitions then write them at same place 
  figure>a>img,figcaption>main>footer
  figure:hover img{}
  transform:translate3d(x,y,z) for creating vertical sliding animation
  add transition-delay for delaying animation
  ACCORDION
  give li background color and image
give the parent the container as flex
.opened{background-size:increase,flex-basis:32rem} 
item:hover:not(.opened){}
ANIMATION
animation:duration|function|delay|iteration-count|direction|fill-mode|name
direction:forward|reverse|alternate
u can pause animation
lotte animations
create a spinner animation
load event on window
SVG
define svg with view box and then 
svg{width}
stroke-dasharray:10px 20px
@keyframes animate-stroke{
  0%{
    fill:transparent;
    stroke:somecoloe;
    stroke-width:3;
    stroke-dashoffset:25%;
    stroke-dasharray:0 32%
  }
  50%{
    fill:transparent;
    stroke:some-color;
    stroke-width:3
  },
  80%,100%{
    fill:some-color;
    stroke:transparent;
    stroke-width:0;
    stroke-dashoffset:-25%;
    stroke-dasharray:32% 0;

  }
}
0%,80%,100%
40%

FOR TRANSFORMING THE BAR TO CROSSING
transform:translate3d(0,6px,0) rotate(45deg)
nth-child(1) not 0
make a svg in figma or import a svg diagram in figma and the select the parts u want to animate together and group them 
u can also make a curve with gaps
while exporting select the 3 dots that are at side and include with id
click the figma and right click and copy/paste as svg
how to select different elements with different ids like star1 star2
transform-origin:center
#idOFSVG *{transform-box:fill-box}
for bouncing animation u dont have to write from scratch use animate.style use href link
fordotted line{
  stroke-width:,
  stroke-dasharray:
  stroke-dashoffset:
  animation:
}
use javascript for animation reflow to restart position
useelcetor.offsetWidth


 */
