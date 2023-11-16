


export default function Handler({
  roomid,
  roomkey,
  handleClick,
  setOpenedRoomKey,
  setOpenedRoomId,
}: {
  roomid: any;
  roomkey: any;
  handleClick():any
  setOpenedRoomKey:any,
  setOpenedRoomId:any
 
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
