import getContacts from "@/pages/api/helpers/getContacts";
import { RoomType } from "@/pages/api/types";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

export default function AddRoom({
  setAddNewRoom,
  setChatRooms,
  id
}: {
  setAddNewRoom: Dispatch<SetStateAction<boolean>>;
  setChatRooms: Dispatch<SetStateAction<RoomType[]>>;
  id:number
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
      console.log(response.data.rooms)
         setChatRooms(response.data.rooms);
          toast.success("Joined Room");
      } catch (error) {
        console.log(error);
        toast.error("Error occured");
      }
   
  }
  function handleRoomKeyChange(value: string) {
    setRoomKey(Number(value));
  }


  return (
    <div className="h-max w-[300px] bg-slate-200 m-[100px] p-5 rounded-xl relative">
      <button
        onClick={() => setAddNewRoom(false)}
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
               items-center  text-center mt-1"
        onClick={HandleSubmit}
      >
        Create/Join Room
      </button>
    </div>
  );
}
