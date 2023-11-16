import { Dispatch, SetStateAction } from "react";

export default function Options({setAddNewChat,setAddNewRoom}:{setAddNewChat:Dispatch<SetStateAction<boolean>>,setAddNewRoom:Dispatch<SetStateAction<boolean>>}){
    return(
        <>
    <div className="p-2 bg-orange-600 cursor-pointer rounded-xl  " onClick={() => {
      setAddNewChat(true);
      setAddNewRoom(false);
    }}>
      <p className="text-sm text-black font-medium mt-0">New Chat</p>
    </div>
    <div className="p-2 bg-orange-600 cursor-pointer rounded-xl " onClick={() => {
      setAddNewRoom(true);
      setAddNewChat(false)
    }}>
      <p className="text-sm text-black font-medium mt-0">New Room</p>
    </div>
        </>
    )
}