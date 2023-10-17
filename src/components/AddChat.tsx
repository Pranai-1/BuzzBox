import getContacts from "@/pages/api/getContacts";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddChat({numberKey,setAddNewChat,setChats}:{numberKey:number,setAddNewChat:any,setChats:any}){
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
              const response = await axios.post("/api/profile", body);
                toast.success("Chat added")
                setAddNewChat(false)
                const data=await getContacts(numberKey)
                setChats(data)
            }catch(error){
                console.log(error)
              toast.error("Error occured")
            }
          }else{
            toast.error("Invalid Credentials")
          }
         
      
    }
    function handleNameChange(value:string){
        setContactName(value)
    }
    function handleNumberKeyChange(value:string){
       let x=Number(value)
        setContactNumberKey(x)
    }


    return(
        <div className="h-max w-[300px] bg-white m-[100px] p-5 rounded-xl relative" >
               <button
                    onClick={() => setAddNewChat(false)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                  >
                    X
            </button>

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
    )
}