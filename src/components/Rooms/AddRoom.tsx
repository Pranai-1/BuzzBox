import getContacts from "@/pages/api/helpers/getContacts";
import { RoomType } from "@/pages/api/types";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { failed, success } from "../../../public/toast";
import { RoomUser } from ".prisma/client";

export default function AddRoom({
  setAddNewRoom,
  setChatRooms,
  id,
  setDisableMenu
}: {
  setAddNewRoom: Dispatch<SetStateAction<boolean>>;
  setChatRooms: Dispatch<SetStateAction<RoomUser[]>>;
  id:number;
  setDisableMenu:Dispatch<SetStateAction<boolean>>
}) {
  const [roomKey, setRoomKey] = useState(0);
  const [roomKeyErrorMessage, setRoomKeyErrorMessage] = useState<string>("");

  async function HandleSubmit() {
 
    if (roomKey ==0 ){
      setRoomKeyErrorMessage("RoomId is not valid");
      return
    }else{
      setRoomKeyErrorMessage("")
    }
      const body = {
        roomKey,
        id
      };
      try {
        const response=await axios.post("/api/room/addRooms", body); 
      setAddNewRoom(false)
      const x:RoomUser=response.data.addedRoom
      console.log(x)
      setChatRooms((prev)=>[...prev,x]);
          success("Joined Room");
      } catch (error) {
        console.log(error);
      failed("Error occured");
      }
   
  }
  function handleRoomKeyChange(value: string) {
    setRoomKey(Number(value));
  }


  return (
    <div className="h-max w-max md:w-[540px] bg-slate-200 p-5 rounded-xl relative flex flex-col flex-wrap m-auto">
      <button
        onClick={() => {
          setAddNewRoom(false)
          setDisableMenu(false)
        }}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
      >
        X
      </button>

      <label className="block text-gray-700 text-sm font-bold mb-1 w-full">
      roomKey<span className="text-red-500">*</span>
        <input
          title="RoomKey"
          type="text"
          required
          placeholder="Enter RoomKey"
          onChange={(e) => handleRoomKeyChange(e.target.value)}
          className="block w-full p-3 border rounded mt-1"
        />
      </label>
      {roomKeyErrorMessage.length>0 && (
        <p className="text-red-500 text-sm">{roomKeyErrorMessage}</p>
      )}
      
      <button
        className="p-2 font-normal text-xl bg-orange-500 rounded-xl text-white h-max pt-1 
               items-center  text-center mt-1 w-max mx-auto"
        onClick={HandleSubmit}
      >
        Create/Join Room
      </button>
    </div>
  );
}
