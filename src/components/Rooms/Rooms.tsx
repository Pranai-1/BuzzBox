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
  setOpenedRoomId:Dispatch<SetStateAction<number>>
 
}) {
    
  return (
    <div className="h-[50px] bg-slate-200 w-full cursor-pointer rounded-lg flex items-center p-2" onClick={()=>{
        handleClick()
        setOpenedRoomId(roomid)
        setOpenedRoomKey(roomkey)

    }}>
      
      <p className="p-2 font-medium">Key: {roomkey}</p>
    </div>
  );
}
