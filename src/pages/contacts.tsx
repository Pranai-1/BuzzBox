import { GetServerSideProps } from "next"
import { getServerAuthSession } from "./api/auth/authoptions";
import BuzzBox from "../../public/BuzzBox.png"
import { useState } from "react";
import axios from "axios";
import router from "next/router";
import { toast } from "react-toastify";
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
    return {
      props: {
        name:session.user.name,
        numberKey:session.user.numberKey,
        email:session.user.email
      }
    };
}


export default function Contacts({name,numberKey,email}:{name:string,numberKey:number,email:string}){
    const[addNewChat,setAddNewChat]=useState(false);
    const[contactName,setContactName]=useState("");
    const[contactNumberKey,setContactNumberKey]=useState(0);
    const[isEmptyContactName,setIsEmptyContactName]=useState<boolean>(false);
    const[isEmptyContactNumberKey,setIsEmptyContactNumberKey]=useState<boolean>(false);

async function HandleSubmit(){
    if(contactNumberKey==0)
    setIsEmptyContactNumberKey(true);
      else
     setIsEmptyContactNumberKey(false);
      if(contactName.length==0)
      setIsEmptyContactName(true);
    else
    setIsEmptyContactName(false);
    

    if(!isEmptyContactName && !isEmptyContactNumberKey){
        const body={
            contactName,
            contactNumberKey,
            numberKey     
        }
        try{
          const response = await axios.post("/api/contacts", body);
            toast.success("Chat added")
        }catch(error){
          toast.error("Chat may be already present or numberkey is wrong")
        }
      }else{
        toast.error("Invalid Credentials")
      }

    setAddNewChat(false)
}
function handleNameChange(value:string){
    setContactName(value)
}
function handleNumberKeyChange(value:string){
   let x=Number(value)
    setContactNumberKey(x)
}

    return(
        <div className=" h-[655px] w-screen bg-slate-50 flex">
            <div className="h-full w-[350px] flex flex-col bg-slate-200 items-center">
            <div className="h-max w-[200px] bg-blue-200 flex flex-col items-center relative rounded-full mt-3">
            <span className="font-medium p-2 text-orange-700">User Profile</span>
            <div className="h-[90px] w-[90px] rounded-full bg-yellow-100 flex items-center justify-center">
                <div
                className="w-full h-full bg-center bg-no-repeat bg-contain overflow-hidden rounded-full"
                style={{
                    backgroundImage: `url(${BuzzBox.src})`,
                }}
                ></div>
               
            </div>
            <p className="font-medium">{name}</p>
            <p className="font-normal mb-2">key-{numberKey}</p>
        </div>
          <div className="p-2 ml-[250px]">
          <p className=" text-2xl text-orange-500 ml-6 cursor-pointer mb-0" onClick={()=>{setAddNewChat(true)}} >+</p>
            <p className=" text-sm text-orange-500 mt-0" >New Chat</p>
          </div>
            </div>
            {addNewChat ?(
               <div className="h-max w-[300px] bg-white m-[100px] p-5 rounded-xl">
               <label className="block text-gray-700 text-sm font-bold mb-1 w-full">
                    Name<span className="text-red-500">*</span>
                    <input
                        title="Name"
                        type="text"
                        required
                        placeholder="Enter Your Name"
                        onChange={(e) => handleNameChange(e.target.value)}
                        className="block w-full p-3 border rounded mt-1"
                    />
                </label>
                {isEmptyContactName && (
                 <p className="text-red-500 text-sm">Name is required*</p>
               )}
                <label className="block text-gray-700 text-sm font-bold mb-1 w-full">
                    NumberKey<span className="text-red-500">*</span>
                    <input
                        title="Name"
                        type="number"
                        required
                        placeholder="Enter 6 Digit NumberKey"
                        onChange={(e) => handleNumberKeyChange(e.target.value)}
                        className="block w-full p-3 border rounded mt-1"
                    />
                </label>
                {isEmptyContactNumberKey && (
            <p className="text-red-500 text-sm">NumberKey is required*</p>
         )}
                <button className="p-2 font-normal text-xl bg-orange-500 rounded-xl text-white h-max pt-1 
               items-center  text-center mt-1"
               onClick={HandleSubmit}
               >Add Chat</button>
               </div>
            ):(
               <div></div>
            )}
       
        </div>
    )
}