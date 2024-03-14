import { Dispatch, SetStateAction } from "react";


export default function Handler({
  userId,
  name,
  numberKey,
  handleClick,
  setOpenedChatName,
  setOpenedChatNumberKey,
  setOpenedChatId,
}: {
  userId: number;
  name: string;
  numberKey: number;
  handleClick:()=>void;
  setOpenedChatName:Dispatch<SetStateAction<string>>;
  setOpenedChatNumberKey:Dispatch<SetStateAction<number>>;
  setOpenedChatId:Dispatch<SetStateAction<number>>
}) {
  const char=name.charAt(0).toLocaleUpperCase()
  return (
    <div className="h-[50px] w-full cursor-pointer rounded-lg flex flex-wrap items-center justify-center md:p-2 text-white  md " onClick={()=>{
      handleClick()
      setOpenedChatName(name)
      setOpenedChatNumberKey(numberKey)
      setOpenedChatId(userId)
    }}>
      {/* <div className="bg-slate-400 rounded-full  lg:flex items-center justify-center hidden  md:hidden ">
        <p className=" font-medium md:text-xl px-3 py-1">{char}</p>
      </div> */}
      <p className="p-2 font-medium flex flex-wrap">{name}</p>
    </div>
  );
}
