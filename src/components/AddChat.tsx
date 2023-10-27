import getContacts from "@/pages/api/helpers/getContacts";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddChat({
  numberKey,
  setAddNewChat,
  setChats,
  id
}: {
  numberKey: number;
  setAddNewChat: any;
  setChats: any;
  id:number
}) {
  const [contactName, setContactName] = useState("");
  const [contactNumberKey, setContactNumberKey] = useState(0);
  const [contactNameErrorMessage, setContactNameErrorMessage] = useState<string>("");
  const [numberKeyErrorMessage, setNumberKeyErrorMessage] =useState<string>("");

  async function HandleSubmit() {
    if (contactName.length <3){
      setContactNameErrorMessage("name must contain 3 characters");
      return
    } else{
      setContactNameErrorMessage("")
    }
    if (contactNumberKey <100000 || contactNumberKey>999999){
      setNumberKeyErrorMessage("contact key should be of 6 digits");
      return
    }else{
      setNumberKeyErrorMessage("")
    }
      const body = {
        contactName,
        contactNumberKey,
        numberKey,
        id
      };
      try {
      await axios.post("/api/profile", body); 
        setAddNewChat(false)
       const response=await axios.get("/api/getcontactsaftersubmit",{
        headers:{
          numberKey
        }
       })
         setChats(response.data.chats);
          toast.success("Chat added");
      } catch (error) {
        console.log(error);
        toast.error("Error occured");
      }
   
  }
  function handleNameChange(value: string) {
    setContactName(value);
  }
  function handleNumberKeyChange(value: string) {
    let x = Number(value);
    setContactNumberKey(x);
  }

  return (
    <div className="h-max w-[300px] bg-slate-200 m-[100px] p-5 rounded-xl relative">
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
      {contactNameErrorMessage.length>0 && (
        <p className="text-red-500 text-sm">{contactNameErrorMessage}</p>
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
      {numberKeyErrorMessage.length>0 && (
        <p className="text-red-500 text-sm">{numberKeyErrorMessage}</p>
      )}
      <button
        className="p-2 font-normal text-xl bg-orange-500 rounded-xl text-white h-max pt-1 
               items-center  text-center mt-1"
        onClick={HandleSubmit}
      >
        Add Chat
      </button>
    </div>
  );
}
