import { GetServerSideProps } from "next"
import { getServerAuthSession } from "./api/auth/authoptions";
import BuzzBox from "../../public/BuzzBox.png"
import { useEffect, useState } from "react";
import axios from "axios";
import router from "next/router";
import { toast } from "react-toastify";
import getContacts from "./api/getContacts";
import { PrismaClient } from "@prisma/client";
import { ContactType } from "./api/types";
import Contacts from "@/components/Contacts";
import Profile from "@/components/profile";
import AddChat from "@/components/AddChat";



export const getServerSideProps:GetServerSideProps=async(ctx)=>{
    const session = await getServerAuthSession(ctx);
    console.log(session?.user.numberKey)
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
const data=await getContacts(session.user.numberKey)
console.log(data)
    return {
      props: {
        name:session.user.name,
        numberKey:session.user.numberKey,
        email:session.user.email,
        contacts:data
      }
    };
}



export default function Home({name,numberKey,email,contacts}:{name:string,numberKey:number,email:string,contacts:ContactType[]}){
    const[addNewChat,setAddNewChat]=useState(false);
    const[chats,setChats]=useState(contacts)


    return(
        <div className=" h-[655px] w-screen bg-slate-50 flex ">
      <div className="h-full w-[350px] flex flex-col bg-slate-200 items-center p-2">
        <div>
               <Profile name={name} numberKey={numberKey}/>
        </div>
          <div className="p-2 ml-[250px]">
          <p className=" text-2xl text-orange-500 ml-6 cursor-pointer mb-0" onClick={()=>{setAddNewChat(true)}} >+</p>
            <p className=" text-sm text-orange-500 mt-0" >New Chat</p>
          </div>
          <div className="flex flex-col gap-3 flex-wrap  w-full mt-5">
                {chats.map((contact)=>(
               <Contacts id={contact.id}
                         name={contact.name}
                         numberKey={contact.numberKey}
                        
               />
               ))
              }
              </div>

              </div>
              {addNewChat ?(
                <AddChat numberKey={numberKey} setAddNewChat={setAddNewChat} setChats={setChats}/>
               
            ):(
             
               <div></div>
               
            )}
             </div>
   
);

  }



