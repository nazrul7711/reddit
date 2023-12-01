import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { LuHome } from "react-icons/lu";

export default function Home() {
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

tailwind flex,items-center,justify-between,px,py,mx,my,bg-zinc-200,h-fit or w-fit,rounded,animation-spin.ping.pulse.bounce,hover:animate-spin,

how to make a animation like spin-slow in tailwind

if u have the intellisense then hovering over the classNames gives css

use command click to know the type 

why use Pick<"User","name|email">


*/

/*
use node version 20.1.0 otherwise u might face issue that backend is not supporting multiform data

when copying code for firebase use whole code like dont delete partial code like i did deleting snapshort part of the uploading function

u can write  a promise and also write await in front of it to get the file 

in prisma how to create one to many relations and what causes a cycle error and how to get rid of it

if u have modified prisma model what do u do?

if you have async await function and await axios.put runs into an error the next line will not be triggered

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

//concerns what, push back on that,enshrined, fall through that is a bummer,m saying with zero malice i mean they seam wholesome,a lawsuit revoking approval its working its way through the courts.if that was to succedd.needlessly put some through hell , finding caught in the middle of ,for the likes of hayes,preemptively choose life,excerbate for people of color significant diparities,modicum of medical understanding,overwhelmingly,dereliction of duty, no inapropriate time to lament abt it,meek

//count me convinced, dangerous leaders are currently dime a dozen,to conceal his blistering chops he plays guitar to great leagth,thought about as much he has amazingly,thats not the first time a horse has seemed to have an issue, creepy unreciprocated affection,physched about his achievement, it certifies quirky records,and to design this event and send a adjudicator they can charge anywhere between 12000 to 1/2 a million and this doesn't come cheap, confers a sense of legitimacy , reinforces a cult of personality, check all of the boxes, but then it hit me i dont need it, untenability of these two positions.
//outside perspective of what ails the company u name it.its ubiquitous. as u can tell, their reputation has taken a bit of a knock here,found itself under scruitny for everyting  for exacerbating income inequality, for all its talk , one of the disillusioned emmployee painted a pretty damninng portrait of the company ,mitigate the harm not to intensify it,cultivated a reputaion ,these lads often use a stint at mckinsey as a spingboard,good at bullshitting your way to a plaushoble sounding answer, novel, thats emblematic of what role mcKinsy play,summed up his mission,they sold themselve with the  notion that they had special insights.some unplesant stains on its records,loudly defend your work there, how many uplifting project do u need to counterbalance feat like opiod,beyond the pale,incumbent upon us to not loose sight,end justifies the meets,america has israels back,shah has modis ear,by saying these things they immediatly tap into the bigger fear,shore up its supplies

//position itself with upbeat materials,this growth has been fueled by targeting low income individuals,marginalised economically,its not one off mistake,disparity between what top execs make and rank and file do,things will quikly fall apart,it is hard to overstate the indifferecnce these chains show to their employees,set aside the thousand rodants i know its a big ask,she is giving a blank look honey not even at my lowest,i got standarts i got taste,at a rally he promised to mellow out on islamophobia,whilst i think that,what it spells for the immigrants,tar with this brush , they get to have their apple and eat it too,

//the quality of care prisoner recieve is abysmal and its woefully deficient,unsurprisingly the rosy picture u trying to paint doesn't remotely live upto reality,key reasons fo company often deliver substandard care is due to the incentive they are given,this works as incentive to cut corners, even when he was diagnsied with cancer the cabinet was dragging its feet, the whole vote is just ceremonial,

//in saw the man in the park with pole,the dog ate my homework.the dog entered my room.it scared me
//plant is industrial or agriculture.
//translate, sentiment analysis, voice recognition, diff between nlu and nlg
//word embedding feature representation of words
// word vectors are created with word2vec techniques like glove gemsing  pass data and it will create a vector.
//u can also add a property in file model so that when we have successfull embeddings implemented its status is changed and we can show it in frontend
