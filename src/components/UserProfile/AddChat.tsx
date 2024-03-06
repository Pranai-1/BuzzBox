import getContacts from "@/pages/api/helpers/getContacts";
import { ContactType } from "@/pages/api/types";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { failed, success } from "../../../public/toast";

export default function AddChat({
  setAddNewChat,
  setChats,
  id,
  setDisableMenu
}: {
  setAddNewChat: Dispatch<SetStateAction<boolean>>;
  setChats: Dispatch<SetStateAction<ContactType[]>>;
  id:number;
  setDisableMenu:any
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
        id
      };
      try {
        const response= await axios.post("/api/contacts/addContacts", body); 
        setAddNewChat(false)
         setChats(response.data.chats);
         success("Chat added");
      } catch (error) {
        console.log(error);
        failed("Error occured");
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
    <div className="h-max w-max md:w-[540px] bg-slate-200 p-5 rounded-xl relative flex flex-col flex-wrap m-auto">
      <button
        onClick={() => {
          setAddNewChat(false)
          setDisableMenu(false)
        }}
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
               items-center  text-center mt-1 w-max mx-auto"
        onClick={HandleSubmit}
      >
        Add Chat
      </button>
    </div>
  );
}
