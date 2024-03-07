import { useState } from "react";
import logo from "../../../public/logo.png";

export default function Profile({
  name,
  numberKey,
  setShowProfile,
  setDisableMenu
}: {
  name: string;
  numberKey: number;
  setShowProfile:any;
  setDisableMenu:any
}) {
  const[status,setStatus]=useState<string>("")
  return (
    <div className="w-max h-[600px] mx-auto rounded-xl text-white flex flex-wrap items-center shadow-lg justify-center">
    <div className="w-max h-max flex flex-col bg-gray-200 rounded-lg p-3 gap-4">
    <label className="text-gray-600 font-bold flex items-center gap-2">
      Username:
      <input value={name} className="rounded-lg p-2" readOnly/>
    </label>
    <label className="text-gray-600 font-bold flex items-center gap-2">
    numberKey:
      <input value={numberKey} className="rounded-lg p-2" readOnly/>
    </label>

      {/* <span className="text-2xl font-semibold text-orange-500 mt-2 capitalize">{name}</span>
      {numberKey>0 &&(
          <p className="mt-1 font-normal text-gray-300">Key: {numberKey}</p>
      )} */}
      <label className="text-gray-600 font-bold flex items-center gap-2">
    status:
      <input value={status} className="rounded-lg p-2" type="text" placeholder="update status" onChange={(e)=>setStatus(e.target.value)}/>
    </label>
     <button className="p-2 bg-orange-600 font-bold rounded-lg" onClick={()=>{
      setShowProfile(false)
      setDisableMenu(false)
    }}>update</button>
    </div>
  </div>
  
  
  );
}
