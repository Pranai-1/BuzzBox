import { NextApiRequest, NextApiResponse, GetServerSideProps } from "next"
import auth from "./api/AnonymousUser/auth"
import { useRouter } from "next/router"
import Profile from "@/components/UserProfile/profile"
import sendIcon from "../../public/send.png"
import { useState } from "react"

export default function AnonChat({id,name}:{id:number,name:string}){
    const[started,setStarted]=useState<boolean>(false)
    const router=useRouter()
    const numberKey=0
    const[textToSend,setTextToSend]=useState<string>();
    const HandleSend=()=>{

    }
    const handleKeyDown = (e:any) => {
        if (e.key === 'Enter') {
          HandleSend();
        }
      };

    function renderMessages() {
       return(
        <div className="h-[569px] w-full mt-1">
          <p>Hi</p>
        </div>
       )
    }

    function HandleStart() {
      if(started)
      return
    setStarted(true)
    }

    function HandleEsc() {
        if(started)
        setStarted(false)
      else
        return
     
    }

    return(
        <div className="h-max w-full bg-gray-500 flex flex-col flex-wrap">
        <div className="w-full h-max bg-orange-600 p-1 text-white flex justify-center items-center">
            <span>You are using anonymous account,all changes will be lost</span>
            <span className="font-medium bg-black rounded-lg px-1 mx-1 cursor-pointer" onClick={()=>router.push("/signup")}>Create Account</span>
        </div>
       <div className="h-full w-full flex">
        <div className="h-[675px] w-[350px] flex flex-col items-center p-2 pt-0 bg-gradient-to-b from-teal-400 to-purple-600">
        <Profile name={name} numberKey={numberKey}/>
        </div>
     
        <div className="h-max w-full m-1  text-xl font-medium text-slate-300 flex flex-col justify-center items-center">
        <div className="bg-gray-600 p-2 h-max w-full text-center text-slate-300 font-medium rounded-lg">New Chat</div>
        {started ? (
        <>
          {renderMessages()}  
        </>
        ) : (
        
        <div className="h-[569px] flex flex-col justify-center items-center">
            
            <span className="text-4xl p-2">BuzzBox</span>
            <span className="font-normal">Start chatting now to connect with random strangers from around the world. Be respectful and have fun!</span>
        </div>
)}

       
       <div className="h-[50px] w-full bg-slate-300 rounded  flex justify-center items-center ">
            <div>
                <button className="bg-gray-600 p-1 text-white rounded-lg mx-1" onClick={HandleEsc}>ESC</button>
                <button className="bg-gray-600 p-1 text-white rounded-lg mx-1 mr-3" onClick={HandleStart}>START</button>
            </div>
         
            <label className="bg-white h-[40px] w-2/3 rounded-lg p-2 flex items-center justify-between font-medium">
              <input
                className="h-[40px] w-full p-2 border-orange-500"
                title="message"
                placeholder="Enter your message here"
                value={textToSend}
                onChange={(e) => { setTextToSend(e.target.value) }}
                onKeyDown={handleKeyDown}
              />
              <div onClick={HandleSend}>
                <img src={sendIcon.src} className="h-[40px] cursor-pointer" alt="Send" />
              </div>
            </label>
          </div>
        </div>
       
        </div>
        
        </div>
    )
}

export const getServerSideProps = async ({req,res}:{req:NextApiRequest,res:NextApiResponse}) => {
    await auth(req,res)
    const id=Number(req.headers["AnonId"])
    const name=String(req.headers["AnonName"])
  console.log(id+name)
    return {
        props:{
          id,
          name
        }
    }
}