import { Dispatch, SetStateAction } from "react";



export default function Handler({
  roomid,
  roomkey,
  handleClick,
  setOpenedRoomKey,
  setOpenedRoomId,

}: {
  roomid: number;
  roomkey: number;
  handleClick:()=>void
  setOpenedRoomKey:Dispatch<SetStateAction<number>>,
  setOpenedRoomId:Dispatch<SetStateAction<number>>,

 
}) {
    
  return (
    <div className="h-[50px] w-full cursor-pointer rounded-lg flex flex-wrap items-center justify-center md:p-2 text-white " onClick={()=>{
        handleClick()
        setOpenedRoomId(roomid)
        setOpenedRoomKey(roomkey)

    }}>
      
      <p key={roomid} className="p-2 font-medium" >Key: {roomkey}</p>
    </div>
  );
}
