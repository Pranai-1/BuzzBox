import { Dispatch, SetStateAction } from "react";


export default function Handler({
  id,
  roomkey,
 
}: {
  id: any;
  roomkey: any;
 
}) {
    
  return (
    <div className="h-[50px] bg-slate-200 w-full cursor-pointer rounded-lg flex items-center p-2" onClick={()=>{
    }}>
      
      <p className="p-2 font-medium">Key: {roomkey}</p>
    </div>
  );
}
